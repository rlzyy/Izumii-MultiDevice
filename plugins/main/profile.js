export default {
    command: ["profile", "my"],
    description: "Melihat kartu profil mu",
    example: "",
    name: "profile",
    tags: "main",

    register: true,

    run: async (m, { conn }) => {
        let user = db.users[m.sender]
        let tek = `[ *Your profile* ]\n\n*Name:* ${user.name}\n*Umur:* ${user.age}\n*Exp:* ${user.exp}\n*Level:* ${user.level}\n*Limit:* ${user.limit}\n*Money:* ${user.money}\n*Status:* ${user.premium ? "Premium" : "Free"}${user.premiumTime >= 1 ? "\n*Expired:* " + clockString(user.premiumTime - Date.now()) : ""}\n*Registrasi:* Ya\n*Waktu Registrasi:* ${func.jam(user.regTime, { timeZone: "Asia/Jakarta" })}, ${func.tanggal(user.regTime, "Asia/Jakarta")}`
    return conn.sendMessage(m.chat, { text: tek }, { quoted: m });
    }
}

function clockString(ms) {
    let d = isNaN(ms) ? "" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "" : Math.floor(ms / 1000) % 60
    return [d, " Hari ", h, " Jam ", m, " Menit ", s, " Detik"].map(v => v.toString().padStart(2, 0)).join("")
}