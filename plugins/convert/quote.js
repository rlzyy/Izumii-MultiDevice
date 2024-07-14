import { writeExif } from '../../system/lib/sticker.js';
import { quote } from '../../storage/script/quote.js';

export default {
    command: ["qc"],
    description: "Membuat stiker qc",
    example: "",
    name: "quote",
    tags: "convert",

    run: async(m, { conn, command, text }) => {
      const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
		let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;
		if (!teks) throw `Example: ${m.prefix + command} <Reply/Input Text>`;
		const res = await quote(teks, avatar, m.pushName)
		let sticker = await writeExif({
			mimetype: 'image/png',
			data: res
		}, {
			packName: global.packname,
			packPublish: global.wm
		});
		m.reply(sticker, { asSticker: true })
    }
}; 
                                  
