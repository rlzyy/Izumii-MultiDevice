import fs from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import Function from "../system/lib/function.js"

//—————「 Setings your bot 」—————//
global.name = "Izumi BOT"
global.wm = "@Irull2nd"

global.author = "Irull"
global.packname = "Created Sticker By Izumii BOT"
global.link = "https://github.com/izumii44"
global.write_store = false //Recommended True
global.mongoAuth = false //Recommended true
global.mongoURL = "" //You must enter the mongodb url if "mongoAuth" Above (true)

global.owner = ["62xxxxx"]
global.pairingNumber = "62xxxxxx" //isi dengan nomor bot mu

global.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i
global.thumbnail = fs.readFileSync("./storage/media/images.jpg")
global.timeImage = Function.timeImage()
global.ucapan = Function.timeSpeech()
global.multiplier = 69
global.typemenu = "v1"
global.func = Function

global.APIs = { // API Prefix
	// name: 'https://website'
	itzpire: 'https://itzpire.com',
	apisku: 'https://apisku.biz.id',
	fumi: 'https://api.fumifumi.xyz',
	neko: 'https:/nekohime.xyz',
	akane: 'https://akane.my.id',
	}
global.APIKeys = { // APIKey Here
	// 'https://website': 'apikey',
	'https://nekohime.xyz': '', //Your Apikey Nekohime API!
}

//—————「 Message settings 」—————//
global.mess = {
    admin: "This command is only for group admins",
    audio: "Reply audio",
    botAdmin: "This command can only be used if the bot is an admin",
    group: "This command can only be used in group chats",
    image: "Reply photos or send photos with captions",
    limit: "Your daily limit has been exhausted, some commands cannot be accessed",
    loading: "Please wait a moment",
    premium: "This command is only for premium users",
    private: "This command can only be used in private chats",
    quoted: "Reply to the message",
    register: "Please register first before using the bot",
    sticker: "Reply sticker",
    video: "Reply video or send video with caption",
    owner: "This command is for bot owners only"
}

global.adReply = {
    contextInfo: {
        externalAdReply: {
            title: ucapan,
            body: wm,
            description: author,
            previewType: "PHOTO",
            thumbnail: thumbnail,
            mediaUrl: link,
            sourceUrl: link
        }
    }
}

//—————「 Don"t change it 」—————//
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update config.js"))
    import(`${file}?update=${Date.now()}`)
})
