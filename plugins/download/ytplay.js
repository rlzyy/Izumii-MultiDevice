import { ytmp3, ytmp4, searchAndFilterVideos, formatNumber } from "../../storage/script/yt-core.js";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";

export default {
    command: ["ytplay", "play"],
    description: "Search for YouTube audio/video",
    example: "",
    name: "play",
    tags: "download",

    limit: true,

    run: async(m, { conn, command, args }) => {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Example: ${m.prefix}${command} Apocalypse - Ciggaretes After Se*x`);
  const isMP3 = /^(play|ytplay|ytmp3|playmp3|playmp4|ytplaymp4)$/i.test(command);
  try {
    let vid = await searchAndFilterVideos(text);
    if (!vid) throw "Video Not Found, Try Another Title";
    let {
      title = "not known",
        thumbnail,
        timestamp = "not known",
        views = "not known",
        ago = "not known",
        url
    } = vid, captvid = `📺 *Title:* ${title}\n⌛ *Duration:* ${timestamp}\n👀 *Views:* ${formatNumber(views)}\n📅 *Upload:* ${ago}\n🔗 *Link:* ${url}\n`, ytthumb = await func.getFile(thumbnail)?.data ?? "", dla = "Downloading audio please wait", dls = isMP3 ? "Play audio succes" : "Play video succes", msg = await generateWAMessageFromContent(m.chat, {
      extendedTextMessage: {
        text: captvid,
        jpegThumbnail: ytthumb,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            body: dla,
            containsAutoReply: !0,
            mediaType: 1,
            mediaUrl: url,
            renderLargerThumbnail: !0,
            showAdAttribution: !0,
            sourceId: global.wm,
            sourceType: "PDF",
            previewType: "PDF",
            sourceUrl: url,
            thumbnail: ytthumb,
            thumbnailUrl: thumbnail,
            title: " Y O U T U B E "
          }
        }
      }
    }, {
      quoted: m
    });
    if (await conn.relayMessage(m.chat, msg.message, {}), isMP3) {
      let Ytdl = await ytmp3(url),
        ytthumb = await func.getFile(Ytdl.meta.image)?.data ?? "",
        doc = {
          audio: Ytdl.buffer,
          mimetype: "audio/mp4",
          fileName: Ytdl.meta.title,
        };
      await conn.sendMessage(m.chat, doc, {
        quoted: m
      });
    } else {
      let q = args[1] || "360p",
        item = await ytmp4(url, q.split("p")[0]),
        captvid = `🔍 *[ RESULT ]*\n📷 *Image URL:* ${item.thumb?.url ?? "Not known"}\n📚 *Title:* ${item.title ?? "Not known"}\n📅 *Date:* ${item.date ?? "Not known"}\n⏱️ *Duration:* ${item.duration ?? "Not known"}\n📺 *Channel:* ${item.channel ?? "Not known"}\n🔒 *Quality:* ${item.quality ?? "Not known"}\n📦 *Content Length:* ${item.contentLength ?? "Not known"}\n📝 *Description:* ${item.description ?? "Not known"}`,
        doc = {
          video: {
            url: item.videoUrl
          },
          mimetype: "video/mp4",
          caption: captvid,
        };
      await conn.sendMessage(m.chat, doc, {
        quoted: m
      });
    }
  } catch (e) {
    console.log(e);
  }
  }
}
