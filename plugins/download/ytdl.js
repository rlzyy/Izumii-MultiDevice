import xyz from "@xyzteams/scapers";

export default {
    command: ["ytdl"],
    description: "Downloading youtube videos",
    example: "Example: %p%cmd <Url>",
    name: "ytdl",
    tags: "download",

    limit: true,

    run: async(m, { conn, text }) => {
    try {
        let Ytdl = await xyz.download.youtube(m.text)
        const video = Ytdl.url
        const title = Ytdl.title
        const duration = Ytdl.duration.formatted
        const cap = `
         *[ Y T  M P 4 ]*
    
    - *Title* : ${title}
    - *Duration*: ${duration}
    - *Resolution* : 360p
    - *Url* : ${text}
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
