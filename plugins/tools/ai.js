import { elxyz } from "../../storage/script/ai.js";

export default {
    command: ["ai"],
    description: "Chat with Elxyz AI",
    example: "Example: %p%cmd Hallo",
    name: "ai",
    tags: "tools",

    run: async(m, { conn, text, command }) => {
    try {
    const {
            key
        } = await conn.sendMessage(m.chat, {
            text: global.mess.loading
        }, {
            quoted: m,
            mentions: [m.sender]
        })
	const result = await elxyz(m.text, m.sender, 'Kamu Adalah Irull, Kamu Memiliki Sifat Cuek, Tapi Kamu Aslinya Baik Dan Pintar, Kamu Berusia 16 Tahun, Kamu Bersekolah Di Smk Negeri 1 Isekai, Kamu Memiliki Hobi Ngoding');
	await func.delay(500)
        await conn.sendMessage(m.chat, {
            text:  `${result.data.answer}`,
            edit: key
        }, {
            quoted: m,
            mentions: [m.sender]
        })
        } catch (e) {
        await m.reply('Error request failed');
        }
      }
  };
