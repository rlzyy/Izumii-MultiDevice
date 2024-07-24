
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n*' + d + '* _Day_ ☀️\n ', '*' + h + '* _Clock_ 🕐\n ', '*' + m + '* _Minute_ ⏰\n ', '*' + s + '* _Second_ ⏱️ '].map(v => v.toString().padStart(2, 0)).join('');
}

export default {
    command: ["bansos"],
    description: "Social assistance for the poor",
    example: "",
    name: "bansos",
    tags: "rpg",
    
    register: true,

    run: async(m, { conn, command, args }) => {
      let u = global.db.users[m.sender];
        u.lastbansos = u.lastbansos || 0;
        let Aku = `${Math.floor(Math.random() * 101)}`.trim();
        let Kamu = `${Math.floor(Math.random() * 81)}`.trim(); // Menantang 😏
        let A = (Aku * 1);
        let K = (Kamu * 1);
        let t = (new Date - u.lastbansos);
        let timers = clockString(604800000 - t);

        if (t > 300000) {
            if (A > K) {
                conn.reply(m.chat, `*You're Caught!* Corruption of social assistance funds 🕴️💰, Fine *3 Million* rupiah 💵`, m);
                u.money -= 3000000;
                u.lastbansos = new Date * 1;
            } else if (A < K) {
                u.money += 3000000;
                conn.reply(m.chat, `*Successful Corruption!* Social assistance funds 🕴️💰, Get *3 Million* rupiah 💵`, m);
                u.lastbansos = new Date * 1;
            } else {
                conn.reply(m.chat, `*Sorry!* You didn't succeed in committing social assistance corruption and you won't go to prison because you *ran away* 🏃`, m);
                u.lastbansos = new Date * 1;
            }
        } else conn.reply(m.chat, `*You've committed corruption!* 💰\nYou have to wait as long as you can to corrupt social assistance again\n▸ 🕓 ${timers}`, m);
    }
}
