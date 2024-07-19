import { ytmp4 } from "../../storage/script/yt-core.js";

export default {
    command: ["ytdl"],
    description: "Downloading youtube videos",
    example: "Example: %p%cmd <Url>",
    name: "ytdl",
    tags: "download",

    limit: true,

    run: async(m, { conn, text }) => {
    try {
        let Ytdl = await ytmp4(m.text)
        const video = Ytdl.url
        const title = Ytdl.title
        const duration = Ytdl.duration
        const cenel = Ytdl.channel
        const publish = Ytdl.published
        const view = Ytdl.views
        const cap = `
         乂 *Y T  M P 4*
    
    ⚘ *Title* : ${title}
    ⚘ *Channel* : ${cenel}
    ⚘ *publish* : ${publish}
    ⚘ *views* : ${view}
    ⚘ *Resolution* : 360p
    ⚘ *Url* : ${text}
        `

        await conn.sendMessage(m.chat,  { video: { url: video }, caption: cap, mimetype: "video/mp4", fileName: title, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 2} }
        }, {
            quoted: m
        })
    } catch (err) {
      m.reply(`Error: ${err.message}`);
    }
  }
}
