import { exifAvatar } from '../../system/lib/sticker.js';

export default {
	command: ["smeta"],
    description: "Create meta stickers",
    example: "",
    name: "smeta",
    tags: "convert",

    run: async(m, { conn, command }) => {
      var stiker = false
      try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        if (/webp/g.test(mime)) {
            let img = await q.download()
        var stiker = await exifAvatar(img, global.packname, global.wm)
      }
          } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
      } finally {
        if (stiker) conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
        else m.reply(`*Conversion failed*\nReply sticker with commands ${m.prefix + command}`)
    }
    }
}; 
