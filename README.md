# 🌱 Baileys

<p align="center">
   Baileys v7 mejorado con correcciones para subidas de medios en newsletters, además de soporte para mensajes interactivos, álbumes y tipos de mensajes adicionales.
   <br><br>
   <a href="https://www.npmjs.com/package/@itsliaaa/baileys">
      <img src="https://img.shields.io/npm/v/@itsliaaa/baileys?style=for-the-badge&logo=npm"/>
   </a>
   <a href="https://www.npmjs.com/package/@itsliaaa/baileys">
      <img src="https://img.shields.io/npm/dm/@itsliaaa/baileys?style=for-the-badge&logo=npm"/>
   </a>
   <a href="https://github.com/itsliaaa/baileys">
      <img src="https://img.shields.io/github/stars/itsliaaa/baileys?style=for-the-badge&logo=github"/>
   </a>
   <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge"/>
   </a>
   <a href="https://nodejs.org">
      <img src="https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&labelColor=green&logoColor=white&style=for-the-badge"/>
   </a>
   <a href="#">
      <img src="https://img.shields.io/badge/ESM-only?logo=javascript&labelColor=yellow&logoColor=black&style=for-the-badge"/>
   </a>
</p>

### ✨ Características Destacadas

Este fork está diseñado para uso en producción con un enfoque en claridad y seguridad:

- 🚫 Sin ofuscación. Fácil de leer y auditar.
- 🚫 Sin comportamiento de auto-seguimiento de canales (newsletter).

> [!NOTE]
> 📄 Este proyecto se mantiene con un alcance limitado y no pretende reemplazar al Baileys original.

### 📋 Tabla de Contenidos
- [📋 Tabla de Contenidos](#-tabla-de-contenidos)
- [✨ Características Destacadas](#-características-destacadas)
- [🛠️ Ajustes Internos](#%EF%B8%8F-ajustes-internos)
- [📨 Manejo y Compatibilidad de Mensajes](#-manejo-y-compatibilidad-de-mensajes)
- [🧩 Opciones de Mensaje Adicionales](#-opciones-de-mensaje-adicionales)
- [📥 Instalación](#-instalación)
   - [🧩 Importación (ESM y CJS)](#-importación-esm--cjs)
- [🌐 Conectar a WhatsApp (Pasos Rápidos)](#-conectar-a-whatsapp-pasos-rápidos)
   - [🔐 Estado de Autenticación (Auth State)](#-estado-de-autenticación-auth-state)
- [🗄️ Implementar Almacén de Datos](#%EF%B8%8F-implementar-almacén-de-datos)
- [🪪 Explicación de IDs de WhatsApp](#-explicación-de-ids-de-whatsapp)
- [✉️ Enviar Mensajes](#%EF%B8%8F-enviar-mensajes)
   - [🔠 Texto](#-texto)
   - [🔔 Menciones](#-menciones)
   - [😁 Reacciones](#-reacciones)
   - [📌 Fijar Mensaje](#-fijar-mensaje)
   - [🔖 Mantener Chat](#-mantener-chat)
   - [➡️ Reenviar Mensaje](#%EF%B8%8F-reenviar-mensaje)
   - [👤 Contacto](#-contacto)
   - [📍 Ubicación](#-ubicación)
   - [🗓️ Evento](#%EF%B8%8F-evento)
   - [👥 Invitación a Grupo](#-invitación-a-grupo)
   - [🛍️ Producto](#%EF%B8%8F-producto)
   - [📊 Encuesta (Poll)](#-encuesta-poll)
   - [💭 Respuesta a Botón](#-respuesta-a-botón)
   - [✨ Respuesta Enriquecida (Rich Response)](#-respuesta-enriquecida-rich-response)
   - [🧾 Mensaje con Bloque de Código](#-mensaje-con-bloque-de-código)
   - [🌏 Mensaje con Entidades en Línea](#-mensaje-con-entidades-en-línea)
   - [📋 Mensaje con Tabla](#-mensaje-con-tabla)
   - [🎞️ Mención en Estado](#%EF%B8%8F-mención-en-estado)
- [📁 Enviar Mensajes Multimedia](#-enviar-mensajes-multimedia)
   - [🖼️ Imagen](#%EF%B8%8F-imagen)
   - [🎥 Video](#-video)
   - [📃 Sticker (Pegatina)](#-sticker-pegatina)
   - [💽 Audio](#-audio)
   - [🗂️ Documento](#%EF%B8%8F-documento)
   - [🖼️ Álbum (Imagen y Video)](#%EF%B8%8F-álbum-imagen-y-video)
   - [📦 Paquete de Stickers](#-paquete-de-stickers)
- [👉🏻 Enviar Mensajes Interactivos](#-enviar-mensajes-interactivos)
   - [🔘 Botones](#-botones)
   - [📋 Lista](#-lista)
   - [🗄️ Interactivo](#%EF%B8%8F-interactivo)
   - [🫙 Plantilla Hidratada (Hydrated Template)](#-plantilla-hidratada-hydrated-template)
- [💳 Enviar Mensajes de Pago](#-enviar-mensajes-de-pago)
   - [➕ Invitar a Pago](#-invitar-a-pago)
   - [🧾 Factura (Invoice)](#-factura-invoice)
   - [🛍️ Pedido (Order)](#%EF%B8%8F-pedido-order)
   - [💳 Solicitar Pago](#-solicitar-pago)
- [👁️ Otras Opciones de Mensaje](#%EF%B8%8F-otras-opciones-de-mensaje)
   - [🤖 Icono de IA](#-icono-de-ia)
   - [🕒 Efímero (Ephemeral)](#-efímero-ephemeral)
   - [📰 Respuesta con Anuncio Externo](#-respuesta-con-anuncio-externo)
   - [🧑‍🧑‍🧒 Estado de Grupo](#%E2%80%8D%E2%80%8D-estado-de-grupo)
   - [🐱 Sticker Lottie](#-sticker-lottie)
   - [🧩 Raw (Mensaje Crudo)](#-raw-mensaje-crudo)
   - [🏷️ Etiqueta de Servicio Seguro Meta](#%EF%B8%8F-etiqueta-de-servicio-seguro-meta)
   - [📑 Spoiler](#-spoiler)
   - [👁️ Vista Única (View Once)](#%EF%B8%8F-vista-única-view-once)
   - [👁️ Vista Única V2](#%EF%B8%8F-vista-única-v2)
   - [👁️ Vista Única V2 Extensión](#%EF%B8%8F-vista-única-v2-extensión)
- [♻️ Modificar Mensajes](#%EF%B8%8F-modificar-mensajes)
   - [🗑️ Eliminar Mensajes](#%EF%B8%8F-eliminar-mensajes)
   - [✏️ Editar Mensajes](#%EF%B8%8F-editar-mensajes)
- [🧰 Contenidos Adicionales](#-contenidos-adicionales)
   - [🏷️ Encontrar ID de Usuario (JID|PN/LID)](#%EF%B8%8F-encontrar-id-de-usuario-jidpnlid)
   - [🔑 Solicitar Código de Emparejamiento Personalizado](#-solicitar-código-de-emparejamiento-personalizado)
   - [🖼️ Procesamiento de Imágenes](#%EF%B8%8F-procesamiento-de-imágenes)
   - [📣 Gestión de Newsletters](#-gestión-de-newsletters)
   - [👥 Gestión de Grupos](#-gestión-de-grupos)
   - [👥 Gestión de Comunidades](#-gestión-de-comunidades)
   - [👤 Gestión de Perfil](#-gestión-de-perfil)
   - [🛒 Gestión de Negocios](#-gestión-de-negocios)
   - [🔐 Gestión de Privacidad](#-gestión-de-privacidad)
   - [📡 Eventos](#-eventos)
- [🚀 Probar el Bot](#-probar-el-bot)
- [📦 Base del Fork](#-base-del-fork)
- [📣 Créditos](#-créditos)

---

### 🛠️ Ajustes Internos
- 🖼️ Corregido un problema por el cual no se podían enviar medios a newsletters debido a un error del upstream.
- 📁 Reintroducido [`makeInMemoryStore`](#%EF%B8%8F-implementar-almacén-de-datos) con una adaptación ESM mínima y pequeños ajustes para Baileys v7.
- 📦 Cambiada la ejecución de FFmpeg de `exec` a `spawn` para un manejo más seguro de procesos.
- 🗃️ Añadido [`@napi-rs/image`](https://www.npmjs.com/package/@napi-rs/image) como backend de procesamiento de imágenes compatible en [`getImageProcessingLibrary()`](#%EF%B8%8F-procesamiento-de-imágenes), ofreciendo un equilibrio entre rendimiento y compatibilidad.

### 📨 Manejo y Compatibilidad de Mensajes
- 📩 Soporte ampliado para mensajes:
   - 🖼️ [Mensaje de Álbum](#%EF%B8%8F-álbum-imagen-y-video)
   - 👤 [Mensaje de Estado de Grupo](#%E2%80%8D%E2%80%8D-estado-de-grupo)
   - 👉🏻 [Mensaje Interactivo](#-enviar-mensajes-interactivos) (botones, listas, flujos nativos, plantillas, carruseles).
   - 🎞️ [Mensaje de Mención en Estado](#%EF%B8%8F-mención-en-estado)
   - 📦 [Mensaje de Paquete de Stickers](#-paquete-de-stickers)
   - ✨ [Mensaje de Respuesta Enriquecida](#-respuesta-enriquecida-rich-response) **[NUEVO]**
   - 🧾 [Mensaje con Bloques de Código](#-mensaje-con-bloque-de-código) **[NUEVO]**
   - 🌏 [Mensaje con Entidades en Línea](#-mensaje-con-entidades-en-línea) **[NUEVO]**
   - 📋 [Mensaje con Tabla](#-mensaje-con-tabla) **[NUEVO]**
   - 💳 [Mensajes relacionados con Pagos](#-enviar-mensajes-de-pago) (solicitudes de pago, invitaciones, pedidos, facturas).
- 📰 Simplificado el envío de mensajes con miniatura de anuncio usando [`externalAdReply`](#-respuesta-con-anuncio-externo), sin necesidad de `contextInfo` manual.
- 💭 Añadido soporte para citar mensajes dentro de canales (newsletter). **[NUEVO]**
- 🎀 Añadido soporte para [iconos personalizados en botones](#%EF%B8%8F-interactivo). **[NUEVO]**

### 🧩 Opciones de Mensaje Adicionales
- 👁️ Añadidas banderas booleanas opcionales para el manejo de mensajes:
   - 🤖 [`ai`](#-icono-de-ia) - Icono de IA en el mensaje
   - 📣 [`mentionAll`](#-menciones) - Mencionar a todos los participantes del grupo sin necesidad de sus JIDs en `mentions` o `mentionedJid` **[NUEVO]**
   - 🔧 [`ephemeral`](#-efímero-ephemeral), [`groupStatus`](#%E2%80%8D%E2%80%8D-estado-de-grupo), [`isLottie`](#-sticker-lottie), [`spoiler`](#-spoiler), [`viewOnce`](#%EF%B8%8F-vista-única-view-once), [`viewOnceV2`](#%EF%B8%8F-vista-única-v2), [`viewOnceV2Extension`](#%EF%B8%8F-vista-única-v2-extensión), [`interactiveAsTemplate`](#%EF%B8%8F-interactivo) - Envoltorios de mensajes
   - 🔒 [`secureMetaServiceLabel`](#%EF%B8%8F-etiqueta-de-servicio-seguro-meta) - Etiqueta de servicio seguro Meta en el mensaje **[NUEVO]**
   - 📄 [`raw`](#-raw-mensaje-crudo) - Construye tu mensaje manualmente **(NO USAR PARA EXPLOTACIÓN)**

### 📥 Instalación

- 📄 Vía `package.json`

```json
# NPM
"dependencies": {
   "mitzuki-baileys": "latest"
}

# GitHub
"dependencies": {
   "mitzuki-baileys": "github:mitzuki/baileys"
}
```

- ⌨️ Vía terminal

```bash
# NPM
npm i mitzuki-baileys@latest

# GitHub
npm i github:mitzuki/baileys
```

#### 🧩 Importación (ESM y CJS)

```javascript
// --- ESM
import { makeWASocket } from 'mitzuki-baileys'

// --- CJS
const { makeWASocket } = require('mitzuki-baileys')
```

### 🌐 Conectar a WhatsApp (Pasos Rápidos)

```javascript
import { makeWASocket, delay, DisconnectReason, useMultiFileAuthState } from 'mitzuki-baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const myPhoneNumber = '6288888888888'

const logger = pino({ level: 'silent' })

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')
    
   const sock = makeWASocket({
      logger,
      auth: state
   })

   sock.ev.on('creds.update', saveCreds)

   sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Código de emparejamiento', ':', code)
      }
      else if (connection === 'close') {
         const shouldReconnect = new Boom(connection?.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('⚠️ Conexión cerrada porque', lastDisconnect.error, ', reconectando ', shouldReconnect)
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      }
      else if (connection === 'open') {
         console.log('✅ Conectado exitosamente a WhatsApp')
      }
   })

   sock.ev.on('messages.upsert', async ({ messages }) => {
      for (const message of messages) {
         if (!message.message) continue

         console.log('🔔 Nuevo mensaje', ':', message)
         await sock.sendMessage(message.key.remoteJid, {
            text: '👋🏻 Hola mundo'
         })
      }
   })
}

connectToWhatsApp()
```

#### 🔐 Estado de Autenticación (Auth State)

> [!NOTE]
> Puedes usar experimentalmente `useSingleFileAuthState` y `useSqliteAuthState` como alternativa a `useMultiFileAuthState`. Sin embargo, `useSingleFileAuthState` ya incluye un mecanismo de caché interno, por lo que no es necesario envolver `state.keys` con `makeCacheableSignalKeyStore`.

### 🗄️ Implementar Almacén de Datos

> [!CAUTION]
> Recomiendo encarecidamente construir tu propio almacén de datos, ya que mantener todo el historial de chat en memoria puede llevar a un uso excesivo de RAM.

```javascript
import { makeWASocket, makeInMemoryStore, delay, DisconnectReason, useMultiFileAuthState } from 'mitzuki-baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'

const myPhoneNumber = '6288888888888'

const storePath = './store.json'

const logger = pino({ level: 'silent' })

const connectToWhatsApp = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')
    
   const sock = makeWASocket({
      logger,
      auth: state
   })

   const store = makeInMemoryStore({
      logger,
      socket: sock
   })

   store.bind(sock.ev)

   sock.ev.on('creds.update', saveCreds)

   sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update
      if (connection === 'connecting' && !sock.authState.creds.registered) {
         await delay(1500)
         const code = await sock.requestPairingCode(myPhoneNumber)
         console.log('🔗 Código de emparejamiento', ':', code)
      }
      else if (connection === 'close') {
         const shouldReconnect = new Boom(connection?.lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('⚠️ Conexión cerrada porque', lastDisconnect.error, ', reconectando ', shouldReconnect)
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      }
      else if (connection === 'open') {
         console.log('✅ Conectado exitosamente a WhatsApp')
      }
   })

   sock.ev.on('chats.upsert', () => {
      console.log('✉️ Chats obtenidos', store.chats.all())
   })

   sock.ev.on('contacts.upsert', () => {
      console.log('👥 Contactos obtenidos', Object.values(store.contacts))
   })

   store.readFromFile(storePath)

   setInterval(() => {
      store.writeToFile(storePath)
   }, 180000)
}

connectToWhatsApp()
```

### 🪪 Explicación de IDs de WhatsApp

`id` es el ID de WhatsApp, también llamado `jid` y `lid`, de la persona o grupo al que envías el mensaje.
- Debe tener el formato `[código de país][número de teléfono]@s.whatsapp.net`
   - Ejemplo para personas: `19999999999@s.whatsapp.net` y `12699999999@lid`.
   - Para grupos, debe tener el formato `123456789-123345@g.us`.
- Para Meta AI, es `11111111111@bot`.
- Para listas de difusión, es `[timestamp de creación]@broadcast`.
- Para estados, el ID es `status@broadcast`.

### ✉️ Enviar Mensajes

> [!NOTE]
> Puedes obtener el `jid` de `message.key.remoteJid` en el primer ejemplo.

#### 🔠 Texto

```javascript
// --- Enviar un mensaje de texto normal
sock.sendMessage(jid, {
   text: '👋🏻 Hola'
}, {
   quoted: message
})

// --- Enviar un mensaje de texto con vista previa del enlace
const urlA = 'https://www.npmjs.com/package/mitzuki-baileys'

sock.sendMessage(jid, {
   text: urlA + ' 👆🏻 ¡Échale un vistazo!',
   linkPreview: {
      'matched-text': urlA,
      title: '🌱 Mitzuki Baileys',
      description: 'Fork mejorado de Baileys',
      previewType: 0,
      jpegThumbnail: fs.readFileSync('./ruta/a/imagen.jpg')
   }
})

// --- Enviar un mensaje de texto con vista previa grande y favicon
import { prepareWAMessageMedia } from 'mitzuki-baileys'

const urlB = 'https://www.npmjs.com/package/mitzuki-baileys#readme'

const { imageMessage: image } = await prepareWAMessageMedia({
   image: {
      url: './ruta/a/imagen.jpg'
   }
}, {
   upload: sock.waUploadToServer,
   mediaTypeOverride: 'thumbnail-link'
})

image.height = 720
image.width = 480

sock.sendMessage(jid, {
   text: urlB + ' 👆🏻 ¡Échale un vistazo!',
   linkPreview: {
      'matched-text': urlB,
      title: '🌱 Mitzuki Baileys',
      description: 'Fork mejorado de Baileys',
      previewType: 0,
      jpegThumbnail: fs.readFileSync('./ruta/a/imagen.jpg'),
      highQualityThumbnail: image,
      linkPreviewMetadata: {
         linkMediaDuration: 0,
         socialMediaPostType: 1,
      }
   },
   favicon: {
      url: './ruta/a/imagen-pequeña.ico'
   }
})
```

#### 🔔 Menciones

```javascript
// --- Mención normal
sock.sendMessage(jid, {
   text: '👋🏻 Hola @628123456789',
   mentions: ['628123456789@s.whatsapp.net']
}, {
   quoted: message
})

// --- Mencionar a todos
sock.sendMessage(jid, {
   text: '👋🏻 Hola @todos',
   mentionAll: true
}, {
   quoted: message
})
```

#### 😁 Reacciones

```javascript
sock.sendMessage(jid, {
   react: {
      key: message.key,
      text: '✨'
   }
})
```

#### 📌 Fijar Mensaje

```javascript
sock.sendMessage(jid, {
   pin: message.key,
   time: 86400,
   type: 1
})
```

#### 🔖 Mantener Chat

> [!NOTE]
> Mantener Chat solo se puede usar en chats o grupos con mensajes efímeros habilitados.

```javascript
sock.sendMessage(jid, {
   keep: message.key,
   type: 1
})
```

#### ➡️ Reenviar Mensaje

```javascript
sock.sendMessage(jid, {
   forward: message,
   force: true
})
```

#### 👤 Contacto

```javascript
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Mitzuki\n'
            + 'ORG:Developer;\n'
            + 'TEL;type=CELL;type=VOICE;waid=628123456789:+62 8123 4567 89\n'
            + 'END:VCARD'

sock.sendMessage(jid, {
   contacts: {
      displayName: 'Mitzuki',
      contacts: [
         { vcard }
      ]
   }
}, {
   quoted: message
})
```

#### 📍 Ubicación

```javascript
sock.sendMessage(jid, {
   location: {
      degreesLatitude: 24.121231,
      degreesLongitude: 55.1121221,
      name: '👋🏻 Estoy aquí'
   }
}, {
   quoted: message
})
```

#### 🗓️ Evento

```javascript
sock.sendMessage(jid, {
   event: {
      name: '🎶 Fiesta Meet & Mingle',
      description: 'Una reunión casual para conectar, charlar y construir nuevas relaciones.',
      call: 'audio',
      startDate: new Date(Date.now() + 3600000),
      endDate: new Date(Date.now() + 28800000),
      isCancelled: false,
      isScheduleCall: false,
      extraGuestsAllowed: false,
      location: {
         name: 'Jakarta',
         degreesLatitude: -6.2,
         degreesLongitude: 106.8
      }
   }
}, {
   quoted: message
})
```

#### 👥 Invitación a Grupo

```javascript
const inviteCode = groupUrl
   .split('chat.whatsapp.com/')[1]
   ?.split('?')[0]

const groupJid = '1201111111111@g.us'
const groupName = 'Mitzuki Baileys'

sock.sendMessage(jid, {
   groupInvite: {
      inviteCode,
      inviteExpiration: Date.now() + 86400000,
      text: '👋🏻 Hola, te invitamos a unirte a nuestro grupo.',
      jid: groupJid,
      subject: groupName,
   }
}, {
   quoted: message
})
```

#### 🛍️ Producto

```javascript
import { randomUUID } from 'crypto'

sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   body: '👋🏻 ¡Mira mi producto aquí!',
   footer: 'Mitzuki Baileys',
   product: {
      currencyCode: 'IDR',
      description: '🛍️ ¡Producto interesante!',
      priceAmount1000: 70_000_000,
      productId: randomUUID(),
      productImageCount: 1,
      salePriceAmount1000: 65_000_000,
      signedUrl: 'https://www.npmjs.com/package/mitzuki-baileys',
      title: '📦 Producto Premium',
      url: 'https://www.npmjs.com/package/mitzuki-baileys'
   },
   businessOwnerJid: '0@s.whatsapp.net'
})
```

#### 📊 Encuesta (Poll)

```javascript
// --- Encuesta normal
sock.sendMessage(jid, {
   poll: {
      name: '🔥 Hora de votar',
      values: ['Sí', 'No'],
      selectableCount: 1,
      toAnnouncementGroup: false,
      endDate: new Date(Date.now() + 28800000),
      hideVoter: false,
      canAddOption: false
   }
}, {
   quoted: message
})

// --- Quiz (solo para newsletters)
sock.sendMessage('1211111111111@newsletter', {
   poll: {
      name: '🔥 Quiz',
      values: ['Sí', 'No'],
      correctAnswer: 'Sí',
      pollType: 1
   }
}, {
   quoted: message
})

// --- Resultado de encuesta
sock.sendMessage(jid, {
   pollResult: {
      name: '📝 Resultado de la Encuesta',
      votes: [{
         name: 'Bien',
         voteCount: 10
      }, {
         name: 'No',
         voteCount: 2
      }],
      pollType: 0
   }
}, {
   quoted: message
})
```

#### 💭 Respuesta a Botón

```javascript
// --- Usando buttonsResponseMessage
sock.sendMessage(jid, {
   type: 'plain',
   buttonReply: {
      id: '#Menu',
      displayText: '✨ Menú Interesante'
   }
}, {
   quoted: message
})

// --- Usando interactiveResponseMessage
sock.sendMessage(jid, {
   flowReply: {
      format: 0,
      text: '💭 Respuesta',
      name: 'menu_options',
      paramsJson: JSON.stringify({
         id: '#Menu',
         description: '✨ Menú Interesante'
      })
   }
}, {
   quoted: message
})

// --- Usando listResponseMessage
sock.sendMessage(jid, {
   listReply: {
      title: '📄 Ver Más',
      description: '✨ Menú Interesante',
      id: '#Menu'
   }
}, {
   quoted: message
})
```

#### ✨ Respuesta Enriquecida (Rich Response)

> [!NOTE]
> `richResponse[]` es una representación de [`submessages[]`](https://baileys.wiki/docs/api/namespaces/proto/interfaces/IAIRichResponseSubMessage) dentro de `richResponseMessage`.

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Ejemplo de estructura submessages',
   richResponse: [{
      text: 'Uso de ejemplo',
   }, {
      language: 'javascript',
      code: [{
         highlightType: 0,
         codeContent: 'console.log("¡Hola, Mundo!")'
      }]
   }, {
      text: 'Bastante simple, ¿verdad?\n'
   }, {
      text: 'Comparación entre Node.js, Bun y Deno',
   }, {
      title: 'Comparación de Runtimes',
      table: [{
         isHeading: true,
         items: ['', 'Node.js', 'Bun', 'Deno']
      }, {
         isHeading: false,
         items: ['Motor', 'V8 (C++)', 'JavaScriptCore (C++)', 'V8 (C++)']
      }, {
         isHeading: false,
         items: ['Rendimiento', '4/5', '5/5', '4/5']
      }]
   }, {
      text: '¿Ayuda esto a aclarar las diferencias?'
   }]
})
```

> [!TIP]
> Puedes añadir fácilmente resaltado de sintaxis importando `tokenizeCode` directamente desde Baileys.

```javascript
import { tokenizeCode } from 'mitzuki-baileys'

const language = 'javascript'
const code = 'console.log("¡Hola, Mundo!")'

sock.sendMessage(jid, {
   disclaimerText: 'Ejemplo de tokenización de bloque de código',
   richResponse: [{
      text: 'Uso de ejemplo',
   }, {
      language,
      code: tokenizeCode(code, language)
   }, {
      text: 'Bastante simple, ¿verdad?'
   }]
})
```

> 💡 Lenguajes soportados: `css`, `html`, `javascript`, `typescript`, `python`, `golang`, `rust`, `c`, `c#`, `c++`, `bash`, `bat`, `powershell`.

#### 🧾 Mensaje con Bloque de Código

> [!NOTE]
> Esta característica ya incluye un tokenizador incorporado con `tokenizeCode`.

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Bloque de Código',
   headerText: '## Uso de ejemplo',
   contentText: '---',
   code: 'console.log("¡Hola, Mundo!")',
   language: 'javascript',
   footerText: 'Bastante simple, ¿verdad?'
})
```

#### 🌏 Mensaje con Entidades en Línea

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Entidades en Línea',
   headerText: '## ¡Echa un vistazo!',
   contentText: '---',
   links: [{
      text: '1. Google',
      title: 'Motor de búsqueda popular',
      url: 'https://www.google.com/'
   }, {
      text: '2. YouTube',
      title: 'Plataforma de streaming popular',
      url: 'https://www.youtube.com/'
   }, {
      text: '3. Mitzuki Baileys',
      title: 'Fork mejorado de Baileys',
      url: 'https://www.npmjs.com/package/mitzuki-baileys'
   }],
   footerText: '---'
})
```

#### 📋 Mensaje con Tabla

```javascript
sock.sendMessage(jid, {
   disclaimerText: 'Tabla',
   headerText: '## Comparación entre Node.js, Bun y Deno',
   contentText: '---',
   title: 'Comparación de Runtimes',
   table: [
      ['', 'Node.js', 'Bun', 'Deno'],
      ['Motor', 'V8 (C++)', 'JavaScriptCore (C++)', 'V8 (C++)'],
      ['Rendimiento', '4/5', '5/5', '4/5']
   ],
   noHeading: false,
   footerText: '¿Ayuda esto a aclarar las diferencias?'
})
```

#### 🎞️ Mención en Estado

```javascript
sock.sendMessage([jidA, jidB, jidC], {
   text: '¡Hola! 👋🏻'
})
```

### 📁 Enviar Mensajes Multimedia

> [!NOTE]
> Para mensajes multimedia, puedes pasar un `Buffer` directamente, o un objeto con `{ stream: Readable }` o `{ url: string }` (ruta de archivo local o URL HTTP/HTTPS).

#### 🖼️ Imagen

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '🔥 Genial'
}, {
   quoted: message
})
```

#### 🎥 Video

```javascript
sock.sendMessage(jid, {
   video: {
      url: './ruta/a/video.mp4'
   },
   gifPlayback: false,
   ptv: false,
   caption: '🔥 Genial'
}, {
   quoted: message
})
```

#### 📃 Sticker (Pegatina)

```javascript
sock.sendMessage(jid, {
   sticker: {
      url: './ruta/a/sticker.webp'
   }
}, {
   quoted: message
})
```

#### 💽 Audio

```javascript
sock.sendMessage(jid, {
   audio: {
      url: './ruta/a/audio.mp3'
   },
   ptt: false
}, {
   quoted: message
})
```

#### 🗂️ Documento

```javascript
sock.sendMessage(jid, {
   document: {
      url: './ruta/a/documento.pdf'
   },
   mimetype: 'application/pdf',
   caption: '✨ ¡Mi trabajo!'
}, {
   quoted: message
})
```

#### 🖼️ Álbum (Imagen y Video)

```javascript
sock.sendMessage(jid, {
   album: [{
      image: {
         url: './ruta/a/imagen.jpg'
      },
      caption: '1ra imagen'
   }, {
      video: {
         url: './ruta/a/video.mp4'
      },
      caption: '1er video'
   }, {
      image: {
         url: './ruta/a/imagen.jpg'
      },
      caption: '2da imagen'
   }, {
      video: {
         url: './ruta/a/video.mp4'
      },
      caption: '2do video'
   }]
}, {
   quoted: message
})
```

#### 📦 Paquete de Stickers

> [!IMPORTANT]
> Si `sharp` o `@napi-rs/image` no están instalados, la `cover` y los `stickers` deben estar ya en formato WebP.

```javascript
sock.sendMessage(jid, {
   cover: {
      url: './ruta/a/imagen.webp'
   },
   stickers: [{
      data: {
         url: './ruta/a/imagen.webp'
      }
   }, {
      data: {
         url: './ruta/a/imagen.webp'
      }
   }, {
      data: {
         url: './ruta/a/imagen.webp'
      }
   }],
   name: '📦 Mi Paquete de Stickers',
   publisher: '🌟 Mitzuki',
   description: 'Mitzuki Baileys'
}, {
   quoted: message
})
```

### 👉🏻 Enviar Mensajes Interactivos

#### 🔘 Botones

```javascript
// --- Mensaje con botones normal
sock.sendMessage(jid, {
   text: '👆🏻 ¡Botones!',
   footer: 'Mitzuki Baileys',
   buttons: [{
      text: '👋🏻 Registrarse',
      id: '#Registro'
   }]
}, {
   quoted: message
})

// --- Botones con Multimedia y Flujo Nativo
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '👆🏻 ¡Botones y Flujo Nativo!',
   footer: 'Mitzuki Baileys',
   buttons: [{
      text: '👋🏻 Calificar',
      id: '#Calificar'
   }, {
      text: '📋 Seleccionar',
      sections: [{
         title: '✨ Sección 1',
         rows: [{
            header: '',
            title: '💭 Ingrediente Secreto',
            description: '',
            id: '#IngredienteSecreto'
         }]
      }, {
         title: '✨ Sección 2',
         highlight_label: '🔥 Popular',
         rows: [{
            header: '',
            title: '🏷️ Cupón',
            description: '',
            id: '#CodigoCupon'
         }]
      }]
   }]
}, {
   quoted: message
})
```

#### 📋 Lista

> [!NOTE]
> Solo funciona en chat privado (`@s.whatsapp.net`).

```javascript
sock.sendMessage(jid, {
   text: '📋 ¡Lista!',
   footer: 'Mitzuki Baileys',
   buttonText: '📋 Seleccionar',
   title: '👋🏻 Hola',
   sections: [{
      title: '🚀 Menú 1',
      rows: [{
         title: '✨ IA',
         description: '',
         rowId: '#IA'
      }]
   }, {
      title: '🌱 Menú 2',
      rows: [{
         title: '🔍 Buscar',
         description: '',
         rowId: '#Buscar'
      }]
   }]
}, {
   quoted: message
})
```

#### 🗄️ Interactivo

```javascript
// --- Flujo Nativo
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '🗄️ ¡Interactivo!',
   footer: 'Mitzuki Baileys',
   optionText: '👉🏻 Seleccionar Opciones',
   optionTitle: '📄 Seleccionar Opciones',
   offerText: '🏷️ ¡Nuevo Cupón!',
   offerCode: 'Mitzuki Baileys',
   offerUrl: 'https://www.npmjs.com/package/mitzuki-baileys',
   offerExpiration: Date.now() + 3_600_000,
   nativeFlow: [{
      text: '👋🏻 Saludo',
      id: '#Saludo',
      icon: 'review'
   }, {
      text: '📞 Llamar',
      call: '628123456789'
   }, {
      text: '📋 Copiar',
      copy: 'Mitzuki Baileys'
   }, {
      text: '🌐 Fuente',
      url: 'https://www.npmjs.com/package/mitzuki-baileys',
      useWebview: true
   }, {
      text: '📋 Seleccionar',
      sections: [{
         title: '✨ Sección 1',
         rows: [{
            header: '',
            title: '🏷️ Cupón',
            description: '',
            id: '#CodigoCupon'
         }]
      }, {
         title: '✨ Sección 2',
         highlight_label: '🔥 Popular',
         rows: [{
            header: '',
            title: '💭 Ingrediente Secreto',
            description: '',
            id: '#IngredienteSecreto'
         }]
      }],
      icon: 'default'
   }],
   interactiveAsTemplate: false,
}, {
   quoted: message
})

// --- Carrusel y Flujo Nativo
sock.sendMessage(jid, {
   text: '🗂️ ¡Interactivo con Carrusel!',
   footer: 'Mitzuki Baileys',
   cards: [{
      image: {
         url: './ruta/a/imagen.jpg'
      },
      caption: '🖼️ Imagen 1',
      footer: '🏷️ Pinterest',
      nativeFlow: [{
         text: '🌐 Fuente',
         url: 'https://www.npmjs.com/package/mitzuki-baileys',
         useWebview: true
      }]
   }, {
      image: {
         url: './ruta/a/imagen.jpg'
      },
      caption: '🖼️ Imagen 2',
      footer: '🏷️ Pinterest',
      offerText: '🏷️ ¡Nuevo Cupón!',
      offerCode: 'Mitzuki Baileys',
      offerUrl: 'https://www.npmjs.com/package/mitzuki-baileys',
      offerExpiration: Date.now() + 3_600_000,
      nativeFlow: [{
         text: '🌐 Fuente',
         url: 'https://www.npmjs.com/package/mitzuki-baileys'
      }]
   }, {
      image: {
         url: './ruta/a/imagen.jpg'
      },
      caption: '🖼️ Imagen 3',
      footer: '🏷️ Pinterest',
      optionText: '👉🏻 Seleccionar Opciones',
      optionTitle: '👉🏻 Seleccionar Opciones',
      offerText: '🏷️ ¡Nuevo Cupón!',
      offerCode: 'Mitzuki Baileys',
      offerUrl: 'https://www.npmjs.com/package/mitzuki-baileys',
      offerExpiration: Date.now() + 3_600_000,
      nativeFlow: [{
         text: '🛒 Producto',
         id: '#Producto',
         icon: 'default'
      }, {
         text: '🌐 Fuente',
         url: 'https://www.npmjs.com/package/mitzuki-baileys'
      }]
   }]
}, {
   quoted: message
})

// --- Flujo Nativo con Audio en el Pie de Página
sock.sendMessage(jid, {
   text: '🔈 ¡Música en el pie de página!',
   audioFooter: {
      url: './ruta/a/audio.mp3'
   },
   nativeFlow: [{
      text: '👍🏻 Bien, siguiente',
      id: '#Siguiente',
      icon: 'review'
   }, {
      text: '👎🏻 Saltar',
      id: '#Saltar',
      icon: 'default'
   }]
}, {
   quoted: message
})
```

#### 🫙 Plantilla Hidratada (Hydrated Template)

```javascript
sock.sendMessage(jid, {
   title: '👋🏻 Hola',
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '🫙 ¡Plantilla!',
   footer: 'Mitzuki Baileys',
   templateButtons: [{
      text: '👉?? Tocar Aquí',
      id: '#Pedido'
   }, {
      text: '🌐 Fuente',
      url: 'https://www.npmjs.com/package/mitzuki-baileys'
   }, {
      text: '📞 Llamar',
      call: '628123456789'
   }]
}, {
   quoted: message
})
```

### 💳 Enviar Mensajes de Pago

#### ➕ Invitar a Pago

```javascript
sock.sendMessage(jid, {
   paymentInviteServiceType: 3
})
```

#### 🧾 Factura (Invoice)

> [!NOTE]
> Los mensajes de factura aún no son compatibles.

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   invoiceNote: '🏷️ Factura'
})
```

#### 🛍️ Pedido (Order)

```javascript
sock.sendMessage(chat, {
   orderText: '🛍️ Pedido',
   thumbnail: fs.readFileSync('./ruta/a/imagen.jpg')
}, {
   quoted: message
})
```

#### 💳 Solicitar Pago

```javascript
sock.sendMessage(jid, {
   text: '💳 Solicitar Pago',
   requestPaymentFrom: '0@s.whatsapp.net'
})
```

### 👁️ Otras Opciones de Mensaje

#### 🤖 Icono de IA

> [!NOTE]
> Solo funciona en chat privado (`@s.whatsapp.net`).

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '🤖 ¡Con icono de IA!',
   ai: true
}, {
   quoted: message
})
```

#### 🕒 Efímero (Ephemeral)

> [!NOTE]
> Envuelve el mensaje en `ephemeralMessage`.

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '👁️ Efímero',
   ephemeral: true
})
```

#### 📰 Respuesta con Anuncio Externo

> [!NOTE]
> Añade una miniatura de anuncio a los mensajes (puede no mostrarse en algunas versiones de WhatsApp).

```javascript
sock.sendMessage(jid, {
   text: '📰 Respuesta con Anuncio Externo',
   externalAdReply: {
      title: '📝 ¿Sabías que...?',
      body: '❓ No lo sé',
      thumbnail: fs.readFileSync('./ruta/a/imagen.jpg'),
      largeThumbnail: false,
      url: 'https://www.npmjs.com/package/mitzuki-baileys'
   }
}, {
   quoted: message
})
```

#### 🧑‍🧑‍🧒 Estado de Grupo

> [!NOTE]
> Solo funciona en chat grupal (`@g.us`).

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '👥 ¡Estado de Grupo!',
   groupStatus: true
})
```

#### 🐱 Sticker Lottie

> [!NOTE]
> Envuelve el mensaje en `lottieStickerMessage`.

```javascript
sock.sendMessage(jid, {
   sticker: {
      url: './ruta/a/sticker.webp'
   },
   isLottie: true
})
```

#### 🧩 Raw (Mensaje Crudo)

```javascript
sock.sendMessage(jid, {
   extendedTextMessage: {
      text: '📃 Construido manualmente desde cero usando la estructura proto cruda de WhatsApp',
      contextInfo: {
         externalAdReply: {
            title: 'Mitzuki Baileys',
            thumbnail: fs.readFileSync('./ruta/a/imagen.jpg'),
            sourceApp: 'whatsapp',
            showAdAttribution: true,
            mediaType: 1
         }
      }
   },
   raw: true
}, {
   quoted: message
})
```

#### 🏷️ Etiqueta de Servicio Seguro Meta

```javascript
sock.sendMessage(jid, {
   text: '🏷️ Solo una etiqueta',
   secureMetaServiceLabel: true
})
```

#### 📑 Spoiler

> [!NOTE]
> Envuelve el mensaje en `spoilerMessage`.

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '❔ Spoiler',
   spoiler: true
})
```

#### 👁️ Vista Única (View Once)

> [!NOTE]
> Envuelve el mensaje en `viewOnceMessage`.

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '👁️ Vista Única',
   viewOnce: true
})
```

#### 👁️ Vista Única V2

> [!NOTE]
> Envuelve el mensaje en `viewOnceMessageV2`.

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '👁️ Vista Única V2',
   viewOnceV2: true
})
```

#### 👁️ Vista Única V2 Extensión

> [!NOTE]
> Envuelve el mensaje en `viewOnceMessageV2Extension`.

```javascript
sock.sendMessage(jid, {
   image: {
      url: './ruta/a/imagen.jpg'
   },
   caption: '👁️ Vista Única V2 Extensión',
   viewOnceV2Extension: true
})
```

### ♻️ Modificar Mensajes

#### 🗑️ Eliminar Mensajes

```javascript
sock.sendMessage(jid, {
   delete: message.key
})
```

#### ✏️ Editar Mensajes

```javascript
// --- Editar texto plano
sock.sendMessage(jid, {
   text: '✨ Quiero decir, ¡genial!',
   edit: message.key
})

// --- Editar título de mensajes multimedia
sock.sendMessage(jid, {
   caption: '✨ Quiero decir, ¡aquí está la imagen!',
   edit: message.key
})
```

### 🧰 Contenidos Adicionales

#### 🏷️ Encontrar ID de Usuario (JID|PN/LID)

> [!NOTE]
> El ID debe contener solo números (sin +, (), ni -) y debe incluir el código de país con el formato de ID de WhatsApp.

```javascript
const phoneNumber = '6281111111111@s.whatsapp.net'

const ids = await sock.findUserId(phoneNumber)

console.log('🏷️ ID de usuario obtenido', ':', ids)
```

#### 🔑 Solicitar Código de Emparejamiento Personalizado

> [!NOTE]
> El número de teléfono debe contener solo números (sin +, (), ni -) y debe incluir el código de país.

```javascript
const phoneNumber = '6281111111111'
const customPairingCode = 'MITZUKI'

await sock.requestPairingCode(phoneNumber, customPairingCode)

console.log('🔗 Código de emparejamiento', ':', customPairingCode)
```

#### 🖼️ Procesamiento de Imágenes

> [!NOTE]
> Usa automáticamente la biblioteca de procesamiento de imágenes disponible: `sharp`, `@napi-rs/image` o `jimp`.

```javascript
import { getImageProcessingLibrary } from 'mitzuki-baileys'
import { readFile } from 'fs/promises'

const lib = await getImageProcessingLibrary()

const bufferOrFilePath = './ruta/a/imagen.jpg'
const width = 512

let output

if (lib.sharp?.default) {
   const img = lib.sharp.default(bufferOrFilePath)
   output = await img.resize(width)
      .jpeg({ quality: 80 })
      .toBuffer()
} else if (lib.image?.Transformer) {
   const inputBuffer = Buffer.isBuffer(bufferOrFilePath)
      ? bufferOrFilePath
      : await readFile(bufferOrFilePath)
   const img = new lib.image.Transformer(inputBuffer)
   output = await img.resize(width, undefined, 0)
      .jpeg(50)
} else if (lib.jimp?.Jimp) {
   const img = await lib.jimp.Jimp.read(bufferOrFilePath)
   output = await img
      .resize({ w: width, mode: lib.jimp.ResizeStrategy.BILINEAR })
      .getBuffer('image/jpeg', { quality: 50 })
} else {
   throw new Error('No hay procesamiento de imágenes disponible')
}

console.log('✅ ¡Procesamiento completado!')
console.dir(output, { depth: null })
```

#### 📣 Gestión de Newsletters

```javascript
// --- Crear uno nuevo
sock.newsletterCreate('Mitzuki Baileys', '📣 Actualizaciones semanales')

// --- Obtener información
const metadata = sock.newsletterMetadata('1231111111111@newsletter')
console.dir(metadata, { depth: null })

// --- Obtener recuento de suscriptores
const subscribers = await sock.newsletterSubscribers('1231111111111@newsletter')
console.dir(subscribers, { depth: null })

// --- Seguir y dejar de seguir
sock.newsletterFollow('1231111111111@newsletter')
sock.newsletterUnfollow('1231111111111@newsletter')

// --- Silenciar y activar sonido
sock.newsletterMute('1231111111111@newsletter')
sock.newsletterUnmute('1231111111111@newsletter')

// --- Degradar administrador
sock.newsletterDemote('1231111111111@newsletter', '6281111111111@s.whatsapp.net')

// --- Cambiar propietario
sock.newsletterChangeOwner('1231111111111@newsletter', '6281111111111@s.whatsapp.net')

// --- Actualizar newsletter
sock.newsletterUpdate('1231111111111@newsletter', { name: 'Mitzuki Baileys' })

// --- Cambiar nombre
sock.newsletterUpdateName('1231111111111@newsletter', '📦 Mitzuki Baileys')

// --- Cambiar descripción
sock.newsletterUpdateDescription('1231111111111@newsletter', '📣 Actualizaciones semanales')

// --- Cambiar foto
sock.newsletterUpdatePicture('1231111111111@newsletter', {
   url: 'ruta/a/imagen.jpg'
})

// --- Eliminar foto
sock.newsletterRemovePicture('1231111111111@newsletter')

// --- Reaccionar a un mensaje
sock.newsletterReactMessage('1231111111111@newsletter', '100', '💛')

// --- Obtener recuento de administradores
const count = await sock.newsletterAdminCount('1231111111111@newsletter')

// --- Obtener todos los newsletters suscritos
const newsletters = await sock.newsletterSubscribed()
console.dir(newsletters, { depth: null })

// --- Obtener mensajes del newsletter
const messages = sock.newsletterFetchMessages('jid', '1231111111111@newsletter', 50, 0, 0)
console.dir(messages, { depth: null })

// --- Eliminar newsletter
sock.newsletterDelete('1231111111111@newsletter')
```

#### 👥 Gestión de Grupos

```javascript
// --- Crear uno nuevo y agregar participantes usando sus JIDs
const group = sock.groupCreate('Mitzuki Baileys', ['628123456789@s.whatsapp.net'])
console.dir(group, { depth: null })

// --- Obtener información
const metadata = await sock.groupMetadata(jid)
console.dir(metadata, { depth: null })

// --- Obtener código de invitación del grupo
const inviteCode = await sock.groupInviteCode(jid)
console.dir(inviteCode, { depth: null })

// --- Revocar enlace de invitación
sock.groupRevokeInvite(jid)

// --- Aceptar invitación al grupo
sock.groupAcceptInvite(inviteCode)

// --- Salir del grupo
sock.groupLeave(jid)

// --- Agregar participantes
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'add')

// --- Eliminar participantes
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'remove')

// --- Ascender a administrador
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'promote')

// --- Degradar de administrador
sock.groupParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'demote')

// --- Aceptar solicitudes de unión
sock.groupRequestParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'approve')

// --- Cambiar nombre
sock.groupUpdateSubject(jid, '📦 Mitzuki Baileys')

// --- Cambiar descripción
sock.groupUpdateDescription(jid, 'Descripción actualizada')

// --- Cambiar foto
sock.updateProfilePicture(jid, {
   url: 'ruta/a/imagen.jpg'
})

// --- Eliminar foto
sock.removeProfilePicture(jid)

// --- Establecer grupo como solo administradores para chatear
sock.groupSettingUpdate(jid, 'announcement')

// --- Establecer grupo como abierto a todos para chatear
sock.groupSettingUpdate(jid, 'not_announcement')

// --- Establecer solo administradores pueden editar la información del grupo
sock.groupSettingUpdate(jid, 'locked')

// --- Establecer todos los participantes pueden editar la información del grupo
sock.groupSettingUpdate(jid, 'unlocked')

// --- Establecer solo administradores pueden agregar participantes
sock.groupMemberAddMode(jid, 'admin_add')

// --- Establecer todos los participantes pueden agregar participantes
sock.groupMemberAddMode(jid, 'all_member_add')

// --- Activar o desactivar mensajes temporales con formato en segundos
sock.groupToggleEphemeral(jid, 86400)

// --- Desactivar mensajes temporales
sock.groupToggleEphemeral(jid, 0)

// --- Activar o desactivar el modo de aprobación de membresía
sock.groupJoinApprovalMode(jid, 'on')
sock.groupJoinApprovalMode(jid, 'off')

// --- Obtener todos los metadatos de los grupos
const groups = await sock.groupFetchAllParticipating()
console.dir(groups, { depth: null })

// --- Obtener solicitudes de unión pendientes
const requests = await sock.groupRequestParticipantsList(jid)
console.dir(requests, { depth: null })

// --- Obtener información del grupo desde el enlace
const group = await sock.groupGetInviteInfo('ABC123456789')
console.log('👥 Información del grupo obtenida desde el código de invitación', ':', group)

// --- Actualizar la etiqueta del miembro del bot
sock.updateMemberLabel(jid, 'Mitzuki Baileys')
```

#### 👥 Gestión de Comunidades

```javascript
// --- Crear una nueva y agregar descripción
const community = await sock.communityCreate('Mitzuki Baileys', '📣 Actualizaciones semanales')
console.dir(community, { depth: null })

// --- Crear un subgrupo para la comunidad y agregar participantes usando sus JIDs
const group = await sock.communityCreateGroup('📢 Anuncios', ['628123456789@s.whatsapp.net'], communityJid)

// --- Vincular un grupo existente
sock.communityLinkGroup(groupJid, communityJid)

// --- Desvincular un grupo existente
sock.communityUnlinkGroup(groupJid, communityJid)

// --- Obtener información
const metadata = await sock.communityMetadata(jid)
console.dir(metadata, { depth: null })

// --- Obtener código de invitación de la comunidad
const inviteCode = await sock.communityInviteCode(jid)
console.dir(inviteCode, { depth: null })

// --- Revocar enlace de invitación
sock.communityRevokeInvite(jid)

// --- Aceptar invitación a la comunidad
sock.communityAcceptInvite(inviteCode)

// --- Salir de la comunidad
sock.communityLeave(jid)

// --- Aceptar solicitudes de unión
sock.communityRequestParticipantsUpdate(jid, ['628123456789@s.whatsapp.net'], 'approve')

// --- Cambiar nombre
sock.communityUpdateSubject(jid, '📦 Mitzuki Baileys')

// --- Cambiar descripción
sock.communityUpdateDescription(jid, 'Descripción actualizada')

// --- Establecer comunidad como solo administradores para chatear
sock.communitySettingUpdate(jid, 'announcement')

// --- Establecer comunidad como abierta a todos para chatear
sock.communitySettingUpdate(jid, 'not_announcement')

// --- Establecer solo administradores pueden editar la información de la comunidad
sock.communitySettingUpdate(jid, 'locked')

// --- Establecer todos los participantes pueden editar la información de la comunidad
sock.communitySettingUpdate(jid, 'unlocked')

// --- Establecer solo administradores pueden agregar participantes
sock.communityMemberAddMode(jid, 'admin_add')

// --- Establecer todos los participantes pueden agregar participantes
sock.communityMemberAddMode(jid, 'all_member_add')

// --- Activar o desactivar mensajes temporales con formato en segundos
sock.communityToggleEphemeral(jid, 86400)

// --- Desactivar mensajes temporales
sock.communityToggleEphemeral(jid, 0)

// --- Activar o desactivar el modo de aprobación de membresía
sock.communityJoinApprovalMode(jid, 'on')
sock.communityJoinApprovalMode(jid, 'off')

// --- Obtener todos los metadatos de las comunidades
const communities = await sock.communityFetchAllParticipating()
console.dir(communities, { depth: null })

// --- Obtener todos los grupos vinculados a la comunidad
const linked = await sock.communityFetchLinkedGroups(jid)
console.dir(linked, { depth: null })

// --- Obtener solicitudes de unión pendientes
const requests = await sock.communityRequestParticipantsList(jid)
console.dir(requests, { depth: null })

// --- Obtener información de la comunidad desde el enlace
const community = await sock.communityGetInviteInfo('ABC123456789')
console.log('👥 Información de la comunidad obtenida desde el código de invitación', ':', community)
```

#### 👤 Gestión de Perfil

```javascript
// --- Obtener foto de perfil del usuario
const url = await sock.profilePictureUrl(jid, 'image')
console.log('🖼️ URL de la foto de perfil del usuario obtenida', url)

// --- Actualizar foto de perfil
sock.updateProfilePicture(jid, buffer)
sock.updateProfilePicture(jid, { url })

// --- Eliminar foto de perfil
sock.removeProfilePicture(jid)

// --- Actualizar nombre de perfil
sock.updateProfileName('Mi Nombre')

// --- Actualizar estado de perfil
sock.updateProfileStatus('Disponible')

// --- Presencia
sock.sendPresenceUpdate('available', jid)
sock.presenceSubscribe(jid)

// --- Confirmaciones de lectura
sock.readMessages([message.key])
sock.sendReceipt(jid, participant, [messageId], 'read')

// --- Bloquear usuario
sock.updateBlockStatus(jid, 'block')

// --- Desbloquear usuario
sock.updateBlockStatus(jid, 'unblock')

// --- Obtener lista de bloqueados
const blocked = await sock.fetchBlocklist()
console.dir(blocked, { depth: null })

// --- Modificar chats
sock.chatModify({
   archive: true,
   lastMessageOrig: message,
   lastMessage: message
}, jid)

// --- Destacar mensajes
sock.star(jid, [{ id: messageId, fromMe: true }], true)

// --- Contacto
sock.addOrEditContact(jid, { displayName: 'Mitzuki' })
sock.removeContact(jid)

// --- Etiqueta
sock.addChatLabel(jid, labelId)
sock.removeChatLabel(jid, labelId)
sock.addMessageLabel(jid, messageId, labelId)

// --- Sincronización de estado de la aplicación
sock.resyncAppState(['regular', 'critical_block'], true)

// --- Obtener perfil de negocio
const profile = await sock.getBusinessProfile(jid)
console.dir(profile, { depth: null })
```

#### 🛒 Gestión de Negocios

```javascript
// --- Crear un nuevo producto
const product = await sock.productCreate({
   name: '🧩 Producto Premium',
   description: '¡Obtén la versión completa del producto!',
   price: 100000,
   currency: 'IDR',
   originCountryCode: 'ID',
   images: [
      bufferImage,
      {
         url: './ruta/a/imagen.jpg'
      }
   ]
})
console.dir(product, { depth: null })

// --- Actualizar producto
await sock.productUpdate(productId, {
   name: '🧩 Producto Premium',
   description: '¡Obtén la versión completa del producto con más funciones!',
   price: 75000,
   currency: 'IDR',
   images: [
      {
         url: './ruta/a/imagen.jpg'
      }
   ]
})

// --- Eliminar producto
sock.productDelete([productId])

// --- Obtener información del catálogo
const { products, nextPageCursor } = await sock.getCatalog({
  jid: '628123456789@s.whatsapp.net',
  limit: 10
})

// --- Obtener colecciones
const collections = await sock.getCollections('628123456789@s.whatsapp.net', 10)
console.dir(collections, { depth: null })

// --- Obtener información del pedido
const order = await sock.getOrderDetails(orderId, tokenBase64)
console.dir(order, { depth: null })

// --- Actualizar perfil de negocio
await sock.updateBusinessProfile({
   address: 'Jakarta, Indonesia',
   description: '🛒 Tienda Oficial',
   websites: ['https://www.npmjs.com/package/mitzuki-baileys'],
   email: 'correo@ejemplo.com',
   hours: {
      timezone: 'Asia/Jakarta',
      days: [{ day: 'mon', mode: 'open_24h' }]
   }
})

// --- Actualizar foto de portada
sock.updateCoverPhoto({
   url: './ruta/a/imagen.jpg'
})

// --- Eliminar foto de portada
sock.removeCoverPhoto(coverId)

// --- Actualizar respuestas rápidas
sock.addOrEditQuickReply({
  shortcut: 'hola',
  message: 'Hola desde la cuenta de negocio',
})

// --- Eliminar respuesta rápida
sock.removeQuickReply(timestamp)
```

#### 🔐 Gestión de Privacidad

```javascript
// --- Actualizar privacidad de última vez
sock.updateLastSeenPrivacy('all')
sock.updateLastSeenPrivacy('contacts')
sock.updateLastSeenPrivacy('contact_blacklist')
sock.updateLastSeenPrivacy('nobody')

// --- Actualizar privacidad en línea
sock.updateOnlinePrivacy('all')
sock.updateOnlinePrivacy('match_last_seen')

// --- Actualizar privacidad de foto de perfil
sock.updateProfilePicturePrivacy('contacts')

// --- Actualizar privacidad de estado
sock.updateStatusPrivacy('contacts')

// --- Actualizar privacidad de confirmaciones de lectura
sock.updateReadReceiptsPrivacy('all')
sock.updateReadReceiptsPrivacy('none')

// --- Actualizar privacidad de agregar a grupos
sock.updateGroupsAddPrivacy('all')
sock.updateGroupsAddPrivacy('contacts')

// --- Actualizar privacidad de mensajes
sock.updateMessagesPrivacy('all')
sock.updateMessagesPrivacy('contacts')
sock.updateMessagesPrivacy('nobody')

// --- Actualizar privacidad de llamadas
sock.updateCallPrivacy('everyone')

// --- Actualizar modo de desaparición predeterminado
sock.updateDefaultDisappearingMode(86400)

// --- Actualizar privacidad de vistas previas de enlaces
sock.updateDisableLinkPreviewsPrivacy(true)
```

#### 📡 Eventos

```javascript
sock.ev.on('connection.update', (update) => {})
sock.ev.on('creds.update', (update) => {})
sock.ev.on('messaging-history.set', (update) => {})
sock.ev.on('messaging-history.status', (update) => {})
sock.ev.on('chats.upsert', (update) => {})
sock.ev.on('chats.update', (update) => {})
sock.ev.on('chats.delete', (update) => {})
sock.ev.on('chats.lock', (update) => {})
sock.ev.on('lid-mapping.update', (update) => {})
sock.ev.on('presence.update', (update) => {})
sock.ev.on('contacts.upsert', (update) => {})
sock.ev.on('contacts.update', (update) => {})
sock.ev.on('messages.delete', (update) => {})
sock.ev.on('messages.update', (update) => {})
sock.ev.on('messages.media-update', (update) => {})
sock.ev.on('messages.upsert', (update) => {})
sock.ev.on('messages.reaction', (update) => {})
sock.ev.on('message-receipt.update', (update) => {})
sock.ev.on('groups.upsert', (update) => {})
sock.ev.on('groups.update', (update) => {})
sock.ev.on('group-participants.update', (update) => {})
sock.ev.on('group.join-request', (update) => {})
sock.ev.on('group.member-tag.update', (update) => {})
sock.ev.on('blocklist.set', (update) => {})
sock.ev.on('blocklist.update', (update) => {})
sock.ev.on('call', (update) => {})
sock.ev.on('labels.edit', (update) => {})
sock.ev.on('labels.association', (update) => {})
sock.ev.on('newsletter.reaction', (update) => {})
sock.ev.on('newsletter.view', (update) => {})
sock.ev.on('newsletter-participants.update', (update) => {})
sock.ev.on('newsletter-settings.update', (update) => {})
sock.ev.on('settings.update', (update) => {})
```

### 🚀 Probar el Bot

Un bot de WhatsApp rápido, ligero y modular construido con **Mitzuki Baileys**.
Perfecto para gestionar grupos, moderar chats y añadir diversión con juegos de preguntas y herramientas útiles.

👉🏻 [@itsliaaa/starseed](https://github.com/itsliaaa/starseed#readme)

Un wrapper ligero pero potente de Baileys diseñado para simplificar el desarrollo mientras amplía el soporte para tipos de mensajes adicionales y funciones de WhatsApp.

👉🏻 [@itsliaaa/starcore](https://www.npmjs.com/package/@itsliaaa/starcore)

### 📦 Base del Fork

Este fork está basado en [Baileys (GitHub)](https://github.com/WhiskeySockets/Baileys)

### 📣 Créditos

Este fork utiliza definiciones de Protocol Buffer mantenidas por [WPP Connect](https://github.com/wppconnect-team) a través de [`wa-proto`](https://github.com/wppconnect-team/wa-proto)

El crédito completo es atribuido a los mantenedores y colaboradores originales de Baileys:
- [purpshell](https://github.com/purpshell)
- [jlucaso1](https://github.com/jlucaso1)
- [adiwajshing](https://github.com/adiwajshing)

**Mitzuki Baileys** es un fork modificado que incluye mejoras adicionales basadas en el trabajo de [Lia Wynn](https://github.com/itsliaaa).

> [!CAUTION]
> ⚠️ **La modificación, eliminación o tergiversación de estos créditos está estrictamente prohibida. Cualquier redistribución o fork debe preservar esta sección en su forma original sin excepción.**
```
