/**
 * Decodificador de Argo (formato binario de GraphQL que WhatsApp usa en w:mex
 * cuando el <result> trae format="argo").
 *
 * Port a JS de la parte de lectura de https://github.com/beeper/argo-go
 * (MIT, Copyright 2025 Automattic Inc.). El esquema de tipos de WhatsApp
 * (WAProto/argo/argo-wire-type-store.argo) y el mapa de query IDs vienen de
 * https://github.com/tulir/whatsmeow (MPL-2.0).
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// ---------- tipos de wire ----------
const T = {
    STRING: 'STRING', BOOLEAN: 'BOOLEAN', VARINT: 'VARINT', FLOAT64: 'FLOAT64', BYTES: 'BYTES',
    FIXED: 'FIXED', BLOCK: 'BLOCK', NULLABLE: 'NULLABLE', ARRAY: 'ARRAY', RECORD: 'RECORD',
    DESC: 'DESC', ERROR: 'ERROR', PATH: 'PATH', EXTENSIONS: 'EXTENSIONS'
};
const LABEL_NULL = -1;
const LABEL_ABSENT = -2;
const LABEL_ERROR = -3;
const BACKREF_FACTOR = -4;
const FLAG_INLINE_EVERYTHING = 0;
const FLAG_SELF_DESCRIBING_ERRORS = 3;
const FLAG_NULL_TERMINATED_STRINGS = 4;
const FLAG_HAS_USER_FLAGS = 6;

const stringBlock = (key = 'String') => ({ k: T.BLOCK, of: { k: T.STRING }, key, dedupe: true });
const VARINT_BLOCK = { k: T.BLOCK, of: { k: T.VARINT }, key: 'Int', dedupe: false };
const LOCATION = {
    k: T.RECORD,
    fields: [
        { name: 'line', of: VARINT_BLOCK, omittable: false },
        { name: 'column', of: VARINT_BLOCK, omittable: false }
    ]
};
const ERROR_TYPE = {
    k: T.RECORD,
    fields: [
        { name: 'message', of: stringBlock(), omittable: false },
        { name: 'locations', of: { k: T.ARRAY, of: LOCATION }, omittable: true },
        { name: 'path', of: { k: T.PATH }, omittable: true },
        { name: 'extensions', of: { k: T.DESC }, omittable: true }
    ]
};
const SELF_DESCRIBING_BLOCKS = {
    String: stringBlock('String'),
    Bytes: { k: T.BLOCK, of: { k: T.BYTES }, key: 'Bytes', dedupe: true },
    Int: VARINT_BLOCK,
    Float: { k: T.BLOCK, of: { k: T.FLOAT64 }, key: 'Float', dedupe: false }
};
const ABSENT = Symbol('absent');

// zigzag ULEB128 (puede exceder 2^53 en IDs; se devuelve Number salvo que no quepa)
const readLabel = (r) => {
    let value = 0n, shift = 0n, b;
    do {
        if (r.pos >= r.buf.length) throw new Error('argo: fin de buffer leyendo label');
        b = r.buf[r.pos++];
        value |= BigInt(b & 0x7f) << shift;
        shift += 7n;
    } while (b & 0x80);
    const signed = (value >> 1n) ^ -(value & 1n);
    return signed >= BigInt(Number.MIN_SAFE_INTEGER) && signed <= BigInt(Number.MAX_SAFE_INTEGER)
        ? Number(signed)
        : signed;
};
const peekLabel = (r) => {
    const save = r.pos;
    try {
        return readLabel(r);
    }
    finally {
        r.pos = save;
    }
};
const reader = (buf) => ({ buf, pos: 0 });
const readBitset = (r) => {
    let bits = 0n, pos = 0n, more = true;
    while (more) {
        const b = r.buf[r.pos++];
        bits |= BigInt(b >> 1) << pos;
        pos += 7n;
        more = (b & 1) === 1;
    }
    return bits;
};

class MessageSlicer {
    constructor(buf) {
        const r = reader(buf);
        this.flags = readBitset(r);
        if (this.flag(FLAG_HAS_USER_FLAGS)) readBitset(r);
        if (this.flag(FLAG_INLINE_EVERYTHING)) {
            this.segments = [buf.subarray(r.pos)];
        }
        else {
            this.segments = [];
            while (r.pos < buf.length) {
                const len = readLabel(r);
                if (typeof len !== 'number' || len < 0 || r.pos + len > buf.length) {
                    throw new Error(`argo: largo de segmento inválido (${len})`);
                }
                this.segments.push(buf.subarray(r.pos, r.pos + len));
                r.pos += len;
            }
            if (!this.segments.length) throw new Error('argo: mensaje sin core');
        }
        this.core = reader(this.segments[this.segments.length - 1]);
        this.nextBlock = 0;
    }
    flag(n) {
        return ((this.flags >> BigInt(n)) & 1n) === 1n;
    }
    takeBlock() {
        if (this.flag(FLAG_INLINE_EVERYTHING)) return this.core;
        if (this.nextBlock < this.segments.length - 1) return reader(this.segments[this.nextBlock++]);
        return null;
    }
}

const toNumber = (v) => (typeof v === 'bigint' ? Number(v) : v);

export class ArgoDecoder {
    constructor(buf) {
        this.slicer = new MessageSlicer(buf);
        this.blocks = new Map();
    }
    blockReader(block) {
        let br = this.blocks.get(block.key);
        if (br) return br;
        const data = this.slicer.takeBlock();
        if (!data) throw new Error(`argo: no hay más bloques para "${block.key}"`);
        const nullTerminated = this.slicer.flag(FLAG_NULL_TERMINATED_STRINGS);
        const of = block.of.k;
        const values = [];
        const readBytes = (parent) => {
            const l = readLabel(parent);
            if (typeof l === 'number' && l >= 0) {
                if (data.pos + l > data.buf.length) throw new Error(`argo: bloque "${block.key}" sin datos suficientes`);
                const bytes = data.buf.subarray(data.pos, data.pos + l);
                data.pos += l;
                if (nullTerminated && of === T.STRING) data.pos++;
                const v = of === T.STRING ? bytes.toString('utf-8') : Buffer.from(bytes);
                if (block.dedupe) values.push(v);
                return v;
            }
            if (l < LABEL_ERROR && block.dedupe) {
                const idx = -toNumber(l) + BACKREF_FACTOR;
                if (idx < 0 || idx >= values.length) throw new Error(`argo: backref inválido ${idx}`);
                return values[idx];
            }
            throw new Error(`argo: label inesperado ${l} en bloque "${block.key}"`);
        };
        if (of === T.STRING || of === T.BYTES) br = readBytes;
        else if (of === T.VARINT) br = () => readLabel(data);
        else if (of === T.FLOAT64) br = () => {
            const v = data.buf.readDoubleLE(data.pos);
            data.pos += 8;
            return v;
        };
        else if (of === T.FIXED) br = () => {
            const v = Buffer.from(data.buf.subarray(data.pos, data.pos + block.of.length));
            data.pos += block.of.length;
            return v;
        };
        else throw new Error(`argo: tipo de bloque no soportado ${of}`);
        this.blocks.set(block.key, br);
        return br;
    }
    decode(wt) {
        this.slicer.core.pos = 0;
        return this.read(this.slicer.core, wt, null);
    }
    read(r, wt, block) {
        switch (wt.k) {
            case T.BLOCK:
                return this.read(r, wt.of, wt);
            case T.NULLABLE: {
                const l = peekLabel(r);
                if (l === LABEL_NULL) {
                    readLabel(r);
                    return null;
                }
                if (l === LABEL_ABSENT) {
                    readLabel(r);
                    return ABSENT;
                }
                if (l === LABEL_ERROR) {
                    readLabel(r);
                    const n = toNumber(readLabel(r));
                    for (let i = 0; i < n; i++) {
                        if (this.slicer.flag(FLAG_SELF_DESCRIBING_ERRORS)) this.readDesc(r);
                        else this.read(r, ERROR_TYPE, null);
                    }
                    return null;
                }
                if (!isLabeled(wt.of)) {
                    const marker = readLabel(r);
                    if (marker !== 0) throw new Error(`argo: marcador non-null inválido ${marker}`);
                }
                return this.read(r, wt.of, block);
            }
            case T.RECORD: {
                const obj = {};
                for (const f of wt.fields) {
                    let v;
                    if (f.omittable) {
                        const l = peekLabel(r);
                        if (!isLabeled(f.of) && l === 0) {
                            readLabel(r);
                            v = this.read(r, f.of, block);
                        }
                        else if (l === LABEL_ABSENT) {
                            readLabel(r);
                            v = ABSENT;
                        }
                        else v = this.read(r, f.of, block);
                    }
                    else v = this.read(r, f.of, block);
                    if (v !== ABSENT) obj[f.name] = v;
                }
                return obj;
            }
            case T.ARRAY: {
                const n = toNumber(readLabel(r));
                if (n < 0) throw new Error(`argo: largo de array negativo ${n}`);
                const arr = new Array(n);
                for (let i = 0; i < n; i++) {
                    const v = this.read(r, wt.of, block);
                    arr[i] = v === ABSENT ? null : v;
                }
                return arr;
            }
            case T.BOOLEAN: {
                const l = readLabel(r);
                if (l === 0) return false;
                if (l === 1) return true;
                throw new Error(`argo: booleano inválido ${l}`);
            }
            case T.STRING:
            case T.BYTES:
            case T.VARINT:
            case T.FLOAT64:
            case T.FIXED:
                if (!block) throw new Error(`argo: ${wt.k} sin bloque`);
                return this.blockReader(block)(r);
            case T.DESC:
            case T.EXTENSIONS:
                return this.readDesc(r);
            case T.ERROR:
                return this.read(r, ERROR_TYPE, null);
            case T.PATH:
                return this.read(r, { k: T.ARRAY, of: VARINT_BLOCK }, null);
            default:
                throw new Error(`argo: tipo no soportado ${wt.k}`);
        }
    }
    readDesc(r) {
        const m = readLabel(r);
        switch (m) {
            case -1: return null;
            case 0: return false;
            case 1: return true;
            case 2: {
                const n = toNumber(readLabel(r));
                const obj = {};
                for (let i = 0; i < n; i++) {
                    const key = this.blockReader(SELF_DESCRIBING_BLOCKS.String)(r);
                    obj[key] = this.readDesc(r);
                }
                return obj;
            }
            case 3: {
                const n = toNumber(readLabel(r));
                const arr = [];
                for (let i = 0; i < n; i++) arr.push(this.readDesc(r));
                return arr;
            }
            case 4: return this.blockReader(SELF_DESCRIBING_BLOCKS.String)(r);
            case 5: return this.blockReader(SELF_DESCRIBING_BLOCKS.Bytes)(r);
            case 6: return this.blockReader(SELF_DESCRIBING_BLOCKS.Int)(r);
            case 7: return this.blockReader(SELF_DESCRIBING_BLOCKS.Float)(r);
            default: throw new Error(`argo: marcador self-describing inválido ${m}`);
        }
    }
}

const isLabeled = (wt) => {
    switch (wt.k) {
        case T.NULLABLE:
        case T.STRING:
        case T.BOOLEAN:
        case T.BYTES:
        case T.ARRAY:
            return true;
        case T.BLOCK:
            return isLabeled(wt.of);
        default:
            return false;
    }
};

// ---------- almacén de tipos (argo-wire-type-store.argo) ----------
const decodeWireTypeStore = (buf) => {
    const dec = new ArgoDecoder(buf);
    const r = dec.slicer.core;
    const str = () => dec.blockReader(SELF_DESCRIBING_BLOCKS.String)(r);
    const bool = () => {
        const l = readLabel(r);
        if (l !== 0 && l !== 1) throw new Error(`argo store: booleano inválido ${l}`);
        return l === 1;
    };
    const scalar = (l) => {
        switch (l) {
            case -1: return { k: T.STRING };
            case -2: return { k: T.BOOLEAN };
            case -3: return { k: T.VARINT };
            case -4: return { k: T.FLOAT64 };
            case -5: return { k: T.BYTES };
            case -6: return { k: T.FIXED, length: toNumber(readLabel(r)) };
            case -11: return { k: T.DESC };
            default: return undefined;
        }
    };
    const wireType = () => {
        const l = readLabel(r);
        const s = scalar(l);
        if (s) return s;
        switch (l) {
            case -7: {
                const of = scalar(readLabel(r));
                if (!of) throw new Error('argo store: bloque con tipo no escalar');
                const key = str();
                const dedupe = bool();
                return { k: T.BLOCK, of, key, dedupe };
            }
            case -8: return { k: T.NULLABLE, of: wireType() };
            case -9: return { k: T.ARRAY, of: wireType() };
            case -10: {
                const n = toNumber(readLabel(r));
                const fields = [];
                for (let i = 0; i < n; i++) {
                    const name = str();
                    const of = wireType();
                    const omittable = bool();
                    fields.push({ name, of, omittable });
                }
                return { k: T.RECORD, fields };
            }
            case -12: return { k: T.ERROR };
            case -13: return { k: T.PATH };
            case -15: return { k: T.EXTENSIONS };
            default: throw new Error(`argo store: label de tipo desconocido ${l}`);
        }
    };
    if (readLabel(r) !== 2) throw new Error('argo store: se esperaba objeto');
    const n = toNumber(readLabel(r));
    const out = {};
    for (let i = 0; i < n; i++) {
        const name = str();
        out[name] = wireType();
    }
    return out;
};

let cache;
const ARGO_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'WAProto', 'argo');
export const getArgoStore = () => {
    if (!cache) {
        const store = decodeWireTypeStore(readFileSync(join(ARGO_DIR, 'argo-wire-type-store.argo')));
        const names = JSON.parse(readFileSync(join(ARGO_DIR, 'name-to-queryids.json'), 'utf-8'));
        const byQueryId = {};
        for (const [name, id] of Object.entries(names)) byQueryId[id] = name;
        cache = { store, byQueryId, names };
    }
    return cache;
};

const typesByDataPath = (store) => {
    const out = {};
    for (const [name, t] of Object.entries(store)) {
        let r = t.fields?.find((f) => f.name === 'data')?.of;
        while (r && r.k !== T.RECORD) r = r.of;
        for (const f of r?.fields || []) (out[f.name] ??= []).push(name);
    }
    return out;
};
/**
 * Decodifica una respuesta Argo de w:mex a un objeto { data, errors?, extensions? }.
 * El tipo se busca por query ID y, si no está mapeado, por el campo de `data`
 * (dataPath); se queda con el primero que consuma el core completo.
 */
export const decodeArgoResponse = (buf, queryId, dataPath) => {
    const { store, byQueryId } = getArgoStore();
    cache.byDataPath ??= typesByDataPath(store);
    const candidates = [...new Set([byQueryId[queryId], ...(cache.byDataPath[dataPath] || [])].filter(Boolean))];
    if (!candidates.length) throw new Error(`argo: no hay esquema para query ${queryId} (${dataPath})`);
    const data = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
    let firstError;
    for (const name of candidates) {
        try {
            const dec = new ArgoDecoder(data);
            const result = dec.decode(store[name]);
            if (dec.slicer.core.pos !== dec.slicer.core.buf.length) {
                throw new Error(`argo: sobran ${dec.slicer.core.buf.length - dec.slicer.core.pos} bytes con ${name}`);
            }
            return result;
        }
        catch (error) {
            firstError ??= error;
        }
    }
    throw firstError;
};
