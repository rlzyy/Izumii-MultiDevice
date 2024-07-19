//const cooldown = 1000 // 1 detik
//const cooldown = 60000 // 1 menit
//const cooldown = 3600000 // 1 jam
//const cooldown = 86400000 // 1 hari
//const cooldown = 2592000000 // 1 bulan

const cooldown = 900000

export default {
    command: ["adventure", "berpetualang", "mulung"],
    description: "Go on an adventure to get random items",
    example: "",
    name: "adventure",
    tags: "rpg",
    cooldown: cooldown,

    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	let timers = (cooldown - (new Date - user.lastadventure))
	if (user.health < 80) return m.reply(`Minimum required *❤️ 80 Health* For ${command}!!\n\nType *${m.prefix}heal* to increase health.\nOr *${m.prefix}use potion* to use potions.`)
	if (new Date - user.lastadventure <= cooldown) return m.reply(`You've had an adventure, please wait a few more minutes..`)

	user.adventurecount += 1

	const health = func.ranNumb(3, 6)
	const money = func.ranNumb(1000, 3000)
	const exp = func.ranNumb(500, 1000)
	const trash = func.ranNumb(10, 50)
	const rock = func.ranNumb(1, 4)
	const wood = func.ranNumb(1, 4)
	const string = func.ranNumb(1, 3)
	const common = func.ranNumb(1, 2)
	const gold = 1
	const emerald = 1
	const diamond = 1

	user.health -= health
	user.money += money
	user.exp += exp
	user.trash += trash
	user.rock += rock
	user.wood += wood
	user.string += string
	if (user.adventurecount % 25  == 0) user.common  += common
	if (user.adventurecount % 50  == 0) user.gold	+= gold
	if (user.adventurecount % 150 == 0) user.emerald += emerald
	if (user.adventurecount % 400 == 0) user.diamond += diamond

	let txt = `[ *Finished ${command}* ]\n\n`
	txt += `*❤️ health : -${health}*\nYou take it home :\n`
	txt += `*💵 money :* ${money}\n`
	txt += `*✉️ exp :* ${exp}\n`
	txt += `*🗑 trash :* ${trash}\n`
	txt += `*🪨 rock :* ${rock}\n`
	txt += `*🪵 wood :* ${wood}\n`
	txt += `*🕸️ string :* ${string}`
	if (user.adventurecount % 25  == 0) txt += `\n\nBonus adventure ${user.adventurecount} x\n*📦 common :* ${common}`
	if (user.adventurecount % 50  == 0) txt += `\n\nBonus adventure ${user.adventurecount} x\n*👑 gold :* ${gold}`
	if (user.adventurecount % 150 == 0) txt += `\n\nBonus adventure ${user.adventurecount} x\n*💚 emerald :* ${emerald}`
	if (user.adventurecount % 400 == 0) txt += `\n\nBonus adventure ${user.adventurecount} x\n*💎 diamond :* ${diamond}`
	m.reply(txt)
	user.lastadventure = new Date * 1
}
}
