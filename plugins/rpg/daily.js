import fs from 'fs';
const rewards = {
  exp: 12000,
  money: 10000,
  potion: 5
}

export default {
    command: ["claim", "daily"],
    description: "Claim your daily prize here",
    example: "",
    name: "daily",
    tags: "rpg",
    
    register: true,
   
    run: async(m, { conn, command, args }) => {
	let user = global.db.users[m.sender]
	let _timers = 86400000 - (new Date() - user.lastclaim);
    let timers = await func.clockString(_timers);
    if (new Date() - user.lastclaim > 86400000) {
  let text = ''
  for (let reward of Object.keys(rewards)) {
	if (!(reward in user)) continue
	user[reward] += rewards[reward]
	text += `*+${rewards[reward]}* ✨ ${(reward)}\n`
  }
  m.reply(text.trim())
  user.lastclaim = new Date() * 1;
   } else {
      m.reply(
        `🚩 You have made a claim today, please wait until tomorrow to claim again.\n\nTimeout : [ *${timers}* ]`,
      );
     }
 }
}
