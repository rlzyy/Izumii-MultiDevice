import yts from "yt-search";
import xyz from "@xyzteams/scapers";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";

async function searchAndFilterVideos(query, maxResults = 100, similarityThreshold = .5) {
  try {
    const res = await yts(query),
      videos = res.videos.slice(0, maxResults).filter(video => {
        const titleWords = video.title.toLowerCase().split(" "),
          queryWords = query.toLowerCase().split(" ");
        return titleWords.filter(word => queryWords.includes(word)).length / titleWords.length >= similarityThreshold;
      });
    return videos.length > 0 ? videos[0] : res.videos.length > 0 ? res.videos[0] : {};
  } catch (e) {
    return console.error(e), {};
  }
}

export default {
    command: ["ytplay", "play"],
    description: "Search for YouTube audio/video",
    example: "Example: %p%cmd Layang Sworo ft.adella",
    name: "play",
    tags: "download",

    limit: true,

    run: async(m, { conn, command, text }) => {
try {
        let req = await searchAndFilterVideos(m.text)
        await conn.sendMessage(m.chat, {
          react: {
            text: '⏳',
            key: m.key,
          }})
        let Ytdl = await xyz.download.youtube.ytmp3(req.url)
        let bodi = "[ Youtube Play ]"
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
                    body: bodi,
                    sourceUrl: m.text,
                    thumbnail: ytthumb
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })
        } catch (err) {
      m.reply(`Feature error try again later`);
    }
  }
}
