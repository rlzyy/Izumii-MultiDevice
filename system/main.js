/** 
 *  Redeveloped by Irull2nd
 *  CopyRight 2024 MIT License
 *  My Github : https://github.com/izumii44
 *  My Channell : https://bit.ly/3VHEPEL
*/

import "../storage/config.js"
import { Client, Serialize } from "./lib/serialize.js"
import pino from "pino"
import { fileURLToPath } from "url"
import chalk from "chalk"
import readline from "readline"
import chokidar from "chokidar"
import { Boom } from "@hapi/boom"
import NodeCache from "node-cache"
import baileys from "@whiskeysockets/baileys"
import os from "os"
import axios from "axios"
import fs from "fs"
import {
    format,
    promisify,
    isDeepStrictEqual
} from 'util';
import {
  plugins,
  loadPluginFiles,
  reload,
  pluginFolder,
  pluginFilter,
} from "./lib/plugins.js";
import { connectAuth } from "./utils/schema.js";
import useMongoAuthState from "./utils/mongoAuth.js";

// Global API Update
global.API = (name, path = "/", query = {}, apikeyqueryname) => {
  const baseUrl = name in global.APIs ? global.APIs[name] : name;
  const apiKey = apikeyqueryname ? global.APIKeys[baseUrl] : "";
  const queryParams = new URLSearchParams({
    ...query,
    ...(apikeyqueryname && apiKey ? { [apikeyqueryname]: apiKey } : {}),
  });

  return baseUrl + path + (queryParams.toString() ? "?" + queryParams : "");
};
const logger = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` }).child({ class: "irull2nd" }); logger.level = "fatal"
global.store = baileys.makeInMemoryStore({ logger })
if (global.write_store) store.readFromFile("./storage/store.json");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const database = (new (await import("./lib/database.js")).default())
const Authentication = await connectAuth();

async function start() {
    process.on("uncaughtException", (err) => console.error(err))
    process.on("unhandledRejection", (err) => console.error(err))

    const content = await database.read()
    if (content && Object.keys(content).length === 0) {
        global.db = { users: {}, chats: {}, stats: {}, msgs: {}, saweria: {}, sticker: {}, settings: {}, ...(content || {}) }
        await database.write(global.db)
    } else {
        global.db = content
    }
    
    const msgRetryCounterCache = new NodeCache()
    let state, saveCreds;
if (global.mongoAuth) {
    ({ state, saveCreds } = await useMongoAuthState(Authentication));
} else {
    ({ state, saveCreds } = await baileys.useMultiFileAuthState("./storage/temp/session"));
}
    
    const conn = baileys.default({
        msgRetryCounterMap: {},
        logger: logger,
        printQRInTerminal: false,
        auth: {
           creds: state.creds,
           keys: baileys.makeCacheableSignalKeyStore(state.keys, logger),
        },
        browser: baileys.Browsers.windows("Safari"),
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => {
           let jid = baileys.jidNormalizedUser(key.remoteJid)
           let msg = await store.loadMessage(jid, key.id)
    
           return msg?.message || ""
           return proto.Message.fromObject({});
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: 0,
        connectTimeoutMs: 60000,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        markOnlineOnConnect: true
    })

    store.bind(conn.ev)

    await Client({ conn, store })
    global.conn = conn
    
    loadPluginFiles(pluginFolder, pluginFilter, {
    logger: conn.logger,
    recursiveRead: true,
  })
    .then((_) => console.log(chalk.bgBlue('Successfully Obtaining Plugins Files.')))
    .catch(console.error);

      // Session Checking..
       if (global.mongoAuth == false) {
if (fs.existsSync("./storage/temp/session/creds.json") && !conn.authState.creds.registered) {
    console.log(chalk.yellow("-- WARNING: creds.json is broken, please delete it first & try re-pairing --"));
    process.exit(0);
  }
       }

    if (!conn.authState.creds.registered) {
        let phoneNumber

        if (!!global.pairingNumber) {
            phoneNumber = global.pairingNumber.replace(/[^0-9]/g, "")

            if (!Object.keys(baileys.PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
                console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))
                process.exit(0)
            }
        } else {
            phoneNumber = await question(chalk.bgBlack(chalk.greenBright("Please type your WhatsApp number : ")))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, "")

            if (!Object.keys(baileys.PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
                console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))

                phoneNumber = await question(chalk.bgBlack(chalk.greenBright("Please type your WhatsApp number : ")))
                phoneNumber = phoneNumber.replace(/[^0-9]/g, "")
                rl.close()
            }
        }

        setTimeout(async () => {
            let code = await conn.requestPairingCode(phoneNumber)
            code = code?.match(/.{1,4}/g)?.join("-") || code
            console.log(chalk.black(chalk.bgGreen("Your Pairing Code : ")), chalk.black(chalk.white(code)))
        }, 3000)
    }

    conn.ev.on("connection.update", async (update) => {
         const { receivedPendingNotifications } = update //Mengatasi Bug Session
         if (receivedPendingNotifications) {
         conn.ev.flush()
         }
         
        const { lastDisconnect, connection, qr } = update

        if (connection) conn.logger.info(`Connection Status : ${connection}`)
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode

            if (reason === baileys.DisconnectReason.badSession) {
                console.log("File Sesi Rusak, Harap Hapus Sesi dan Pindai Lagi")
                process.send("reset")
            } else if (reason === baileys.DisconnectReason.connectionClosed) {
                console.log("Koneksi ditutup, menyambung kembali....")
                await start()
            } else if (reason === baileys.DisconnectReason.connectionLost) {
                console.log("Koneksi Hilang dari Server, menyambung kembali...")
                await start()
            } else if (reason === baileys.DisconnectReason.connectionReplaced) {
                console.log("Koneksi Diganti, Sesi Baru Dibuka, Harap Tutup Sesi Saat Ini Terlebih Dahulu")
                process.exit(1)
            } else if (reason === baileys.DisconnectReason.loggedOut) {
                console.log("Perangkat Keluar, Silakan Pindai Lagi")
                process.exit(1)
            } else if (reason === baileys.DisconnectReason.restartRequired) {
                console.log("Diperlukan Mulai Ulang, Mulai Ulang...")
                await start()
            } else if (reason === baileys.DisconnectReason.timedOut) {
                console.log("Waktu Sambungan Habis, Mulai Ulang...")
                process.send("reset")
            } else if (reason === baileys.DisconnectReason.multideviceMismatch) {
                console.log("Ketidakcocokan multi perangkat, harap pindai lagi")
                process.exit(0)
            } else {
                console.log(reason)
                process.send("reset")
            }
        }
        
        if (connection === "connecting") {
      console.log(`${chalk.bold.green(`Izumii Whatsapp Bot`)}`)
      console.log(`${chalk.yellow.bgBlack(`Created By Rulzz.`)}`)
      console.log(`${chalk.bold.red(`This script is open source, sale and purchase are prohibited!!!`)}`)
        console.log(chalk.blue(`[Is Connecting]`));
      }
     
        if (connection === "open") {
            const {
                jid
            } = conn.user;
            await func.sleep(5000);
            console.log(chalk.blue(`[Connecting to] WhatsApp web`));
        console.log(chalk.green(`[Connected] ` + JSON.stringify(conn.user, null, 2)));
        await func.sleep(1000);
            
            const currentTime = new Date();
            const pingSpeed = new Date() - currentTime;
            const formattedPingSpeed = pingSpeed < 0 ? 'N/A' : `${pingSpeed}ms`;
            const infoMsg = `Hello ${jid.split('@')[0]}, Your WhatsApp bot is now active.\n\n*[ About the system ]*\nSpeed: ${formattedPingSpeed}\nDate:  ${currentTime.toDateString()}, ${currentTime.toLocaleDateString('id-ID', { weekday: 'long' })}\nCurrent Time: ${currentTime}`;

            const messg = await conn.sendMessage(`${owner}@s.whatsapp.net`, {
                text: infoMsg,
                mentions: [owner + '@s.whatsapp.net', jid]
            }, {
                quoted: null
            });
        }
        });

    conn.ev.on("creds.update", saveCreds);

  // add contacts update to store
  conn.ev.on("contacts.update", (update) => {
        for (let contact of update) {
            let id = baileys.jidNormalizedUser(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

  // add contacts upsert to store
  conn.ev.on("contacts.upsert", (update) => {
    for (let contact of update) {
      let id = baileys.jidNormalizedUser(contact.id);
      if (store && store.contacts)
        store.contacts[id] = { ...(contact || {}), isContact: true };
    }
  });

  // nambah perubahan grup ke store
  conn.ev.on("groups.update", (updates) => {
    for (const update of updates) {
      const id = update.id;
      if (store.groupMetadata[id]) {
        store.groupMetadata[id] = {
          ...(store.groupMetadata[id] || {}),
          ...(update || {}),
        };
      }
    }
  });

  conn.ev.on("messages.upsert", async (message) => {
    if (!message.messages) return;

    const m = await Serialize(conn, message.messages[0]);

    if (store.groupMetadata && Object.keys(store.groupMetadata).length === 0)
      store.groupMetadata = await conn.groupFetchAllParticipating();

    await (
      await import(`./handler.js?v=${Date.now()}`)
    ).handler(conn, m, message);
  });

  conn.ev.on("group-participants.update", async (message) => {
    await (
      await import(`./handler.js?v=${Date.now()}`)
    ).participantsUpdate(message);
  });

  conn.ev.on("groups.update", async (update) => {
    await (await import(`./handler.js?v=${Date.now()}`)).groupsUpdate(update);
  });

  conn.ev.on("call", async (json) => {
    await (await import(`./handler.js?v=${Date.now()}`)).rejectCall(json);
  });

  conn.ev.on("presence.update", async (presenceUpdateEvent) => {
    try {
      await (
        await import(`./handler.js?v=${Date.now()}`)
      ).presenceUpdate(presenceUpdateEvent);
    } catch (error) {
      console.error("Error handling presence update:", error);
    }
  });

    setInterval(async () => {
        if (global.write_store) {
            store.writeToFile("./storage/store.json", true)
        }
    }, 10 * 1000)

    setInterval(async () => {
        if (global.db) await database.write(global.db)
    }, 30000)

    return conn
}

start()

//—————「 Don"t change it 」—————//
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update main.js"))
    import(`${file}?update=${Date.now()}`)
})
