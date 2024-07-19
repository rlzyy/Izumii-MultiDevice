import fs from 'fs';

export default {
    command: ["bank", "atm"],
    description: "Check your money at the ATM",
    example: "",
    name: "atm",
    tags: "rpg",

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	if (args[0] == 'create') {
		if (user.atm > 0) {
			m.reply(`[!] You have created an account.`)
		} else if (user.money < 50000) {
			m.reply(`[!] At least have 💵 50000 for deposits.`)
		} else {
			user.money -= 50000
			user.atm += 50000
			m.reply(`Successfully created an account.`)
		}
	} else {
		if (!user) return m.reply('[!] The user does not exist in the database.')
		if (user.level < user.level) return m.reply('[!] Can't see because the target level is higher.')
		let name = await conn.getName(m.sender)
		let anu = `🏦 Assets *${name.replaceAll('\n','')}*\n\n`
		anu += `*💰 Bank :* ${user.atm}\n`
		anu += `*💵 Money :* ${user.money}\n\n`
		anu += `*👑 Gold :* ${user.gold}\n`
		anu += `*💎 Diamond :* ${user.diamond}\n`
		anu += `*💚 Emerald :* ${user.emerald}`
		await conn.sendMessage(m.chat, { text: anu }, { quoted: m })
	}
}
}
