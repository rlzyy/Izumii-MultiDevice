import fs from 'fs';

export default {
    command: ["bank", "atm"],
    description: "Cek uang kamu di atm",
    example: "",
    name: "atm",
    tags: "rpg",

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	if (args[0] == 'create') {
		if (user.atm > 0) {
			m.reply(`[!] Anda sudah membuat rekening.`)
		} else if (user.money < 50000) {
			m.reply(`[!] Minimal memiliki 💵 50000 untuk deposit.`)
		} else {
			user.money -= 50000
			user.atm += 50000
			m.reply(`Berhasil membuat rekening.`)
		}
	} else {
		if (!user) return m.reply('[!] User tidak ada dalam database.')
		if (user.level < user.level) return m.reply('[!] Tidak dapat melihat karena level target lebih tinggi.')
		let name = await conn.getName(m.sender)
		let anu = `🏦 Aset *${name.replaceAll('\n','')}*\n\n`
		anu += `*💰 Bank :* ${user.atm}\n`
		anu += `*💵 Money :* ${user.money}\n\n`
		anu += `*👑 Gold :* ${user.gold}\n`
		anu += `*💎 Diamond :* ${user.diamond}\n`
		anu += `*💚 Emerald :* ${user.emerald}`
		await conn.sendMessage(m.chat, { text: anu }, { quoted: m })
	}
}
}