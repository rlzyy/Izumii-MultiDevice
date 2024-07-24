export default {
    command: ["mancing"],
    description: "What are you doing? better fishing",
    example: "",
    name: "mancing",
    tags: "rpg",
    
    register: true,

    run: async(m, { conn, command, args }) => {

	let user = global.db.users[m.sender]
	let _timers = 43200000 - (new Date() - user.lastclaim);
    let timers = await func.clockString(_timers);
    if (new Date() - user.lastfishing > 43200000) {
	if (user.fishingrod == 0) return m.reply(`Need *${m.prefix}craft* fishingrod first.\n\nYou have :\n━ 🎣 ${user.fishingrod} FishingRod`)
	let mancing = [
		{"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0},
		{"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}, {"ikan": 0}
	]

	for (let x of mancing) {
		let random = func.ranNumb(0, 2)
		x.ikan += random
	}

	let gmbrt = 'https://telegra.ph/file/4a2dad6f0f6dfef650bf3.jpg'
	let hsl = `[ *Fishing Completed* ]\nToday's catch:

 *🐋 = [ ${mancing[0].ikan} ]*			 *🐡 = [ ${mancing[6].ikan} ]*
 *🐳 = [ ${mancing[1].ikan} ]*			 *🐠 = [ ${mancing[7].ikan} ]*
 *🐬 = [ ${mancing[2].ikan} ]*			 *🦀 = [ ${mancing[8].ikan} ]*
 *🦈 = [ ${mancing[3].ikan} ]*			 *🦞 = [ ${mancing[9].ikan} ]*
 *🐟 = [ ${mancing[4].ikan} ]*			 *🐙 = [ ${mancing[10].ikan} ]*
 *🐟 = [ ${mancing[5].ikan} ]*			 *🦑 = [ ${mancing[11].ikan} ]*
 *🦐 = [ ${mancing[12].ikan} ]*`

	user.fishingroddurability -= func.ranNumb(80, 120)
 	if (user.fishingroddurability <= 0) {
 		user.fishingroddurability = 0
 		user.fishingrod = 0
 	}

	setTimeout(() => {
		user.orca		+= mancing[0].ikan
		user.paus		+= mancing[1].ikan
		user.lumba		+= mancing[2].ikan
		user.hiu		+= mancing[3].ikan
		user.ikan		+= mancing[4].ikan
		user.lele		+= mancing[5].ikan
		user.bawal		+= mancing[6].ikan
		user.nila		+= mancing[7].ikan
		user.kepiting	+= mancing[8].ikan
		user.lobster	+= mancing[9].ikan
		user.gurita		+= mancing[10].ikan
		user.cumi		+= mancing[11].ikan
		user.udang		+= mancing[12].ikan
		conn.sendMedia(m.chat, gmbrt, '', hsl, m)
	}, 180000)
					 
	setTimeout(() => {
		m.reply('_Im fishing..._')
	}, 0)
	user.lastfishing = new Date * 1
	user.mancingcount += 1
} else {
m.reply(`🚩 You've fished, then you can do it in  . . .\n\n[ *${timers}* ]`)
  }
 }
}
