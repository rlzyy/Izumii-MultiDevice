import { Client, Serialize } from "../../system/lib/serialize.js";
import { handler } from "../../system/handler.js";
import baileys from "@whiskeysockets/baileys";
const {
  default: makeWaSocket,
  useMultiFileAuthState,
  makeInMemoryStore,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  DisconnectReason,
} = baileys;
import pino from "pino";
import chalk from "chalk";
import readline from "readline";
import NodeCache from "node-cache";
import path from "path";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode";

const msgRetryCounterCache = new NodeCache();
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store",
  }),
});

export default {
    command: ["jadibot"],
    description: "Rent a bot",
    example: "",
    name: "jadibot",
    tags: "tools",

    premium: true,

    run: async(m, { conn }) => {
        const start = async () => {
      if (m.fromMe) return m.reply("Can't make a Bot from a user into a bot!")	
      const { state, saveCreds } = await useMultiFileAuthState(
        "storage/temp/jadibot/" + m.sender.split("@")[0],
      );

      const conn = baileys.default({
        printQRInTerminal: false,
        logger: pino({
          level: "silent",
        }),
        browser: baileys.Browsers.windows("Safari"),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(
            state.keys,
            pino({ level: "fatal" }).child({ level: "fatal" }),
          ),
        },
        browser: baileys.Browsers.windows("Safari"), // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
        markOnlineOnconnect: true, // set false for offline
        generateHighQualityLinkPreview: true, // make high preview link
        getMessage: async (key) => {
          let jid = jidNormalizedUser(key.remoteJid);
          let msg = await store.loadMessage(jid, key.id);

          return msg?.message || "";
        },
        msgRetryCounterCache, // Resolve waiting messages
        defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
      });

      

      store.bind(conn.ev); 

      await Client({ conn, store });

      if (!conn.authState.creds.registered) {
        let phoneNumber = m.sender.split("@")[0].replace(/[^0-9]/g, "");

        if (
          !Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))
        )
          throw "Start with your country's WhatsApp code, Example : 62xxx";

        await func.delay(3000);
        let code = await conn.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        m.reply("*Your Code :* " + code);
      }

      conn.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
          /*m.reply(await qrcode.toBuffer(qr, { scale: 8 }), {
            caption: teksJadiBot,
          });*/
        }
        try {
          if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
              console.log(
                `Bad Session File, Please Delete Session and Scan Again`,
              );
              start();
            } else if (reason === DisconnectReason.connectionClosed) {
              console.log("connection closed, reconnecting....");
              start();
            } else if (reason === DisconnectReason.connectionLost) {
              console.log("connection Lost from Server, reconnecting...");
              start();
            } else if (reason === DisconnectReason.connectionReplaced) {
              console.log(
                "connection Replaced, Another New Session Opened, Please Close Current Session First",
              );
              start();
            } else if (reason === DisconnectReason.loggedOut) {
              console.log(`Device Logged Out, Please Scan Again And Run.`);
              start();
            } else if (reason === DisconnectReason.restartRequired) {
              console.log("Restart Required, Restarting...");
              start();
            } else if (reason === DisconnectReason.timedOut) {
              console.log("connection TimedOut, Reconnecting...");
              start();
            } else
              conn.end(`Unknown DisconnectReason: ${reason}|${connection}`);
          }
          if (
            update.connection == "connecting" ||
            update.receivedPendingNotifications == "false"
          ) {
            console.log(`[Currently connecting]`);
          }
          if (
            update.connection == "open" ||
            update.receivedPendingNotifications == "true"
          ) {
            console.log(`[connecting to] WhatsApp web`);
            m.reply(`[connected] \n\n` + JSON.stringify(conn.user, null, 2));
          }
        } catch (err) {
          console.log("Error Di connection.update " + err);
          start();
        }
      });

      conn.ev.on("creds.update", saveCreds);

      conn.ev.on("messages.upsert", async (message) => {
        if (!message.messages) return;
        const m = await await Serialize(conn, message.messages[0]);
        await await handler(conn, m);
      });
     
      return conn;
    };

    start();
    }
}
