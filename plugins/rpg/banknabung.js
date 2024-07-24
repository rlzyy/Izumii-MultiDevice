import fs from 'fs';

export default {
    command: ["nabung"],
    description: "Save your money",
    example: "",
    name: "nabung",
    tags: "rpg",

    register: true,

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	if (user.atm == 0) return m.reply(`[!] You don't have an ATM yet.\n\use command *${m.prefix}atm create* to process.`)
	let total = Math.floor(func.isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
	if (command.includes('all')) total = user.money
	if ((user.money - total) > 0) {
		user.money -= total
		user.atm += total
		m.reply(`Successfully saved as much as ${total} Money 💹`)
	} else {
		m.reply(`[❗] You don't have enough money to save ${total} money 💹`)
	}
}
}
