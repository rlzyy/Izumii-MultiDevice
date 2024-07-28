import xyz from "@xyzteams/scapers"

export default {
    command: ["play"],
    description: "Play a youtube audio",
    example: "Example: %p%command Tresno Waranggono",
    name: "Youtube",
    tags: "download",

    run: async (m, { conn }) => {
        await xyz.download.youtube.ytmp3(m.text).then(async (res) => {
            if (!res.url) throw "No results found";
            await conn.sendMessage(m.chat, {
                audio: { url: res.url },
                mimetype: "audio/mp4",
            }, { quoted: m })
        })
    }
}
