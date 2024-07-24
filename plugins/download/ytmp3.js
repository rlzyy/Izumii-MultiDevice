import xyz from "@xyzteams/scapers";

export default {
    command: ["ytmp3"],
    description: "Download youtube audio with mp3 converter",
    example: "Example: %p%cmd <Url>",
    name: "ytmp3",
    tags: "download",

    limit: true,

    run: async(m, { conn, text }) => {
    try {
        let Ytdl = await xyz.download.youtube(m.text)
        let dls = "Download audio success"
        let ytthumb = await (await func.getFile(Ytdl.thumbnail)).data
        let doc = {
            audio: { url: Ytdl.url },
            mimetype: "audio/mp4",
            fileName: Ytdl.title,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: m.text,
                    title: Ytdl.title,
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
