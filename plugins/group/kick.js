export default {
    command: ["kick"],
    description: "Mengeluarkan member di group",
    example: "",
    name: "kick",
    tags: "group",

    group: true,
    admin: true,

    run: async(m, { conn, text, participants }) => {
    try {
		let who = m.quoted ? m.quoted.sender : m.mentions && m.mentions[0] ? m.mentions[0] : m.text ? (m.text.replace(/\D/g, '') + '@s.whatsapp.net') : ''
		if (!who || who == m.sender) return m.reply('*Quote / tag* the target you want to kick!!')
		if (m.metadata.participants.filter(v => v.id == who).length == 0) return m.reply(`Target tidak berada dalam Grup !`)
		const data = await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
		m.reply(func.format(data))
		} catch (e) {
			console.log(e)
			m.reply('Eror Occured')
		}
    }
}