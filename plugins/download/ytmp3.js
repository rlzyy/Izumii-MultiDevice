import { ytmp3 } from "../../storage/script/yt-core.js";

export default {
    command: ["ytmp3"],
    description: "Mengunduh audio youtube",
    example: "Example: %p%cmd <Url>",
    name: "ytmp3",
    tags: "download",

    limit: true,

    run: async(m, { conn, text }) => {
    try {
        let Ytdl = await ytmp3(m.text)
        let dls = "Download audio succes"
        let ytthumb = await (await func.getFile(Ytdl.meta.image)).data
        let doc = {
            audio: Ytdl.buffer,
            mimetype: "audio/mp4",
            fileName: Ytdl.meta.title,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: m.text,
                    title: Ytdl.meta.title,
                    body: dls,
                    sourceUrl: m.text,
                    thumbnail: ytthumb
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })
        } catch (err) {
      m.reply(`Error: ${err.message}`);
    }
  }
}
