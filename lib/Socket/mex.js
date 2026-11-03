import { Boom } from '@hapi/boom';
import { brotliDecompressSync, gunzipSync, inflateRawSync, inflateSync } from 'zlib';
import { decodeArgoResponse } from '../Utils/argo.js';
import { getBinaryNodeChild, S_WHATSAPP_NET } from '../WABinary/index.js';
const toBuffer = (content) => {
    if (Buffer.isBuffer(content)) return content;
    if (content instanceof Uint8Array) return Buffer.from(content);
    if (typeof content === 'string') return Buffer.from(content, 'utf-8');
    return null;
};
const tryParseJSON = (str) => {
    if (typeof str !== 'string') return undefined;
    // quita BOM y bytes de control al inicio/fin
    const clean = str.replace(/^[\uFEFF\x00-\x1F\x7F]+/, '').replace(/[\x00-\x1F\x7F]+$/, '');
    if (!clean) return undefined;
    const isObj = (v) => typeof v === 'object' && v !== null;
    try {
        const v = JSON.parse(clean);
        if (isObj(v)) return v;
    }
    catch { }
    // JSON con bytes extra antes/después
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');
    if (start !== -1 && end > start) {
        try {
            const v = JSON.parse(clean.slice(start, end + 1));
            if (isObj(v)) return v;
        }
        catch { }
    }
    return undefined;
};
/** Lector genérico de protobuf (sin schema): devuelve los strings legibles que encuentre. */
const extractProtoStrings = (buf, depth = 0, out = []) => {
    if (depth > 8 || out.length > 200) return out;
    let i = 0;
    const readVarint = () => {
        let result = 0, shift = 0, b;
        do {
            if (i >= buf.length || shift > 49) throw new Error('varint');
            b = buf[i++];
            result += (b & 0x7f) * 2 ** shift;
            shift += 7;
        } while (b & 0x80);
        return result;
    };
    try {
        while (i < buf.length) {
            const key = readVarint();
            const wire = key % 8;
            if (key < 8) return out;
            if (wire === 0) readVarint();
            else if (wire === 1) i += 8;
            else if (wire === 5) i += 4;
            else if (wire === 2) {
                const len = readVarint();
                if (len < 0 || i + len > buf.length) return out;
                const chunk = buf.subarray(i, i + len);
                i += len;
                const before = out.length;
                extractProtoStrings(chunk, depth + 1, out);
                if (out.length === before) {
                    const str = chunk.toString('utf-8');
                    if (str && !/[\x00-\x08\x0E-\x1F\uFFFD]/.test(str)) out.push(str);
                }
            }
            else return out;
        }
    }
    catch { }
    return out;
};
/**
 * Decodifica el contenido de <result> de una consulta w:mex.
 * WhatsApp a veces responde con bytes extra / comprimido / binario en lugar de JSON plano.
 */
export const decodeMexContent = (content) => {
    const buf = toBuffer(content);
    if (!buf || !buf.length) return undefined;
    let data = tryParseJSON(buf.toString('utf-8'));
    if (data !== undefined) return data;
    for (const fn of [inflateSync, inflateRawSync, gunzipSync, brotliDecompressSync]) {
        try {
            data = tryParseJSON(fn(buf).toString('utf-8'));
            if (data !== undefined) return data;
        }
        catch { }
    }
    // ¿JSON envuelto dentro de un mensaje protobuf?
    for (const str of extractProtoStrings(buf)) {
        data = tryParseJSON(str);
        if (data !== undefined) return data;
    }
    return undefined;
};
const readZigzagVarint = (buf, pos) => {
    let result = 0, shift = 0, b;
    do {
        if (pos >= buf.length || shift > 49) throw new Error('varint fuera de rango');
        b = buf[pos++];
        result += (b & 0x7f) * 2 ** shift;
        shift += 7;
    } while (b & 0x80);
    const value = result % 2 === 0 ? result / 2 : -(result + 1) / 2;
    return { value, pos };
};
/**
 * Formato binario nuevo de w:mex (observado):
 *   [version=0x04][zigzag varint: largo tabla de textos][textos concatenados]
 *   [zigzag varint: largo][sección de escalares (zigzag varints)]
 *   [zigzag varint: largo][estructura]
 * Las claves del esquema (errors, data, message, …) no vienen en el binario.
 */
export const parseMexBinary = (content) => {
    const buf = toBuffer(content);
    if (!buf || buf.length < 3 || buf[0] !== 0x04) return undefined;
    try {
        let { value: strLen, pos } = readZigzagVarint(buf, 1);
        if (strLen < 0 || pos + strLen > buf.length) return undefined;
        const text = buf.subarray(pos, pos + strLen).toString('utf-8');
        pos += strLen;
        const sections = [];
        while (pos < buf.length && sections.length < 8) {
            const r = readZigzagVarint(buf, pos);
            if (r.value < 0 || r.pos + r.value > buf.length) break;
            sections.push(buf.subarray(r.pos, r.pos + r.value));
            pos = r.pos + r.value;
        }
        const scalars = [];
        if (sections[0]) {
            let p = 0;
            try {
                while (p < sections[0].length) {
                    const r = readZigzagVarint(sections[0], p);
                    scalars.push(r.value);
                    p = r.pos;
                }
            }
            catch { }
        }
        return {
            version: buf[0],
            text,
            scalars,
            sections: sections.map((s) => s.toString('hex'))
        };
    }
    catch {
        return undefined;
    }
};
const describeRawMex = (content, attrs) => {
    const buf = toBuffer(content) || Buffer.alloc(0);
    const latin = buf.toString('latin1');
    const newsletterMatch = latin.match(/(\d{15,})(@newsletter)?/);
    const binary = parseMexBinary(buf);
    let error;
    if (binary && /error_code|is_retryable|severity/.test(binary.text)) {
        const idx = binary.text.search(/error_code|is_retryable|severity/);
        error = {
            message: binary.text.slice(0, idx) || 'Unknown error',
            error_code: binary.scalars.find((n) => n >= 100 && n < 1000) || 400,
            severity: binary.text.match(/(CRITICAL|ERROR|WARNING)$/)?.[1]
        };
    }
    return {
        size: buf.length,
        attrs,
        hex: buf.subarray(0, 2048).toString('hex'),
        binary,
        error,
        strings: extractProtoStrings(buf).slice(0, 30),
        newsletterJid: newsletterMatch ? `${newsletterMatch[1]}@newsletter` : undefined
    };
};
const wMexQuery = (variables, queryId, query, generateMessageTag) => {
    return query({
        tag: 'iq',
        attrs: {
            id: generateMessageTag(),
            type: 'get',
            to: S_WHATSAPP_NET,
            xmlns: 'w:mex'
        },
        content: [
            {
                tag: 'query',
                attrs: { query_id: queryId },
                content: Buffer.from(JSON.stringify({ variables }), 'utf-8')
            }
        ]
    });
};
export const executeWMexQuery = async (variables, queryId, dataPath, query, generateMessageTag) => {
    const result = await wMexQuery(variables, queryId, query, generateMessageTag);
    const child = getBinaryNodeChild(result, 'result');
    if (child?.content) {
        let data;
        let argoError;
        if (child.attrs?.format === 'argo') {
            try {
                data = decodeArgoResponse(toBuffer(child.content), queryId, dataPath);
            }
            catch (error) {
                argoError = error;
            }
        }
        if (data === undefined) data = decodeMexContent(child.content);
        if (data === undefined) {
            const raw = describeRawMex(child.content, child.attrs);
            if (argoError) raw.argoError = argoError.message;
            if (raw.error) {
                throw new Boom(`GraphQL server error: ${raw.error.message}`, {
                    statusCode: raw.error.error_code,
                    data: { code: 'MEX_BINARY_ERROR', queryId, dataPath, extensions: raw.error, ...raw }
                });
            }
            throw new Boom(`MEX: WhatsApp devolvió una respuesta no-JSON (query ${queryId}, ${raw.size} bytes)`, {
                statusCode: 422,
                data: { code: 'MEX_NON_JSON', queryId, dataPath, ...raw }
            });
        }
        if (data.errors && data.errors.length > 0) {
            const errorMessages = data.errors.map((err) => err.message || 'Unknown error').join(', ');
            const firstError = data.errors[0];
            const errorCode = firstError.extensions?.error_code || 400;
            throw new Boom(`GraphQL server error: ${errorMessages}`, { statusCode: errorCode, data: firstError });
        }
        const response = dataPath ? data?.data?.[dataPath] : data?.data;
        if (typeof response !== 'undefined') {
            return response;
        }
    }
    const action = (dataPath || '').startsWith('xwa2_')
        ? dataPath.substring(5).replace(/_/g, ' ')
        : dataPath?.replace(/_/g, ' ');
    throw new Boom(`Failed to ${action}, unexpected response structure.`, { statusCode: 400, data: result });
};
//# sourceMappingURL=mex.js.map