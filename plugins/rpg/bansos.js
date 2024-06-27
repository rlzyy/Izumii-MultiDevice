
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n*' + d + '* _Hari_ ☀️\n ', '*' + h + '* _Jam_ 🕐\n ', '*' + m + '* _Menit_ ⏰\n ', '*' + s + '* _Detik_ ⏱️ '].map(v => v.toString().padStart(2, 0)).join('');
}

export default {
    command: ["bansos"],
    description: "Bansos untuk masyarakat miskin",
    example: "",
    name: "bansos",
    tags: "rpg",


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
                conn.reply(m.chat, `*Kamu Tertangkap!* Korupsi dana bansos 🕴️💰, Denda *3 Juta* rupiah 💵`, m);
                u.money -= 3000000;
                u.lastbansos = new Date * 1;
            } else if (A < K) {
                u.money += 3000000;
                conn.reply(m.chat, `*Berhasil Korupsi!* Dana bansos 🕴️💰, Dapatkan *3 Juta* rupiah 💵`, m);
                u.lastbansos = new Date * 1;
            } else {
                conn.reply(m.chat, `*Maaf!* Kamu tidak berhasil melakukan korupsi bansos dan kamu tidak akan masuk penjara karena kamu *melarikan diri* 🏃`, m);
                u.lastbansos = new Date * 1;
            }
        } else conn.reply(m.chat, `*Sudah Melakukan Korupsi!* 💰\nHarus menunggu selama agar bisa korupsi bansos kembali\n▸ 🕓 ${timers}`, m);
    }
}