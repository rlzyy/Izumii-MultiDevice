import fs from 'fs';

export default {
    command: ["nabung"],
    description: "Tabungkan uangmu didalam atm",
    example: "",
    name: "atm",
    tags: "rpg",

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] Anda belum memiliki ATM.\n\ngunakan command *${m.prefix}atm create* untuk memproses.`)
	let total = Math.floor(func.isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (command.includes('all')) total = user.money
	if ((user.money - total) > 0) {
		user.money -= total
		user.atm += total
		m.reply(`Sukses menabung sebesar ${total} Money 💹`)
	} else {
		m.reply(`[❗] Uang anda tidak mencukupi untuk menabung ${total} money 💹`)
	}
}
}