export default {
    command: ["getsw"],
    description: "Downloader status whatsapp.",
    example: "",
    name: "getsw",
    tags: "owner",

    owner: true,

    run: async(m, { conn, command }) => {
    if (m.quoted?.chat != 'status@broadcast') return m.reply(`Quote Pesan Status`)
	let buffer = await m.quoted.download()
	await conn.sendFile(m.chat, buffer, '', m.quoted.text || '', null, false, { quoted: m }).catch(_ => m.reply(m.quoted.text || ''))
    }
}

