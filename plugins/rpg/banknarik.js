import fs from 'fs';

export default {
    command: ["narik", "tarik"],
    description: "Tarik uangmu di atm",
    example: "",
    name: "atm",
    tags: "rpg",

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] Anda belum memiliki ATM.\n\ngunakan command *${m.prefix}atm create* untuk memproses.`)
	if (func.somematch(['all', 'semua'], args[0])) args[0] = user.atm - 50000
	let total = Math.floor(func.isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if ((user.atm - total) >= 50000) {
		user.atm -= total
		user.money += total
		m.reply(`Sukses menarik sebesar ${total} Money 💹`)
	} else m.reply(`[❗] Rekening anda tidak mencukupi untuk menarik ${total} money 💹`)
}
}