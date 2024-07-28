import fs from 'fs';

export default {
    command: ["narik", "tarik"],
    description: "Withdraw your money at the ATM",
    example: "",
    name: "tarik",
    tags: "rpg",

    register: true,

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] You don't have an ATM yet.\n\nuse command *${m.prefix}atm create* to process.`)
	if (func.somematch(['all', 'semua'], args[0])) args[0] = user.atm - 50000
	let total = Math.floor(func.isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if ((user.atm - total) >= 50000) {
		user.atm -= total
		user.money += total
		m.reply(`Success attracts as much as ${total} Money 💹`)
	} else m.reply(`[❗] Your account is insufficient to withdraw ${total} money 💹`)
}
}
