export default {
    command: ["profile", "my"],
    description: "View your profile card",
    example: "",
    name: "profile",
    tags: "main",

    register: true,

    run: async (m, { conn }) => {
        let user = db.users[m.sender]
        let tek = `[ *Your profile* ]\n\n*Name:* ${user.name}\n*Age:* ${user.age}\n*Exp:* ${user.exp}\n*Level:* ${user.level}\n*Limit:* ${user.limit}\n*Money:* ${user.money}\n*Status:* ${user.premium ? "Premium" : "Free"}${user.premiumTime >= 1 ? "\n*Expired:* " + clockString(user.premiumTime - Date.now()) : ""}\n*Registration:* Yes\n*Registration Time:* ${func.jam(user.regTime, { timeZone: "Asia/Jakarta" })}, ${func.tanggal(user.regTime, "Asia/Jakarta")}`
    return conn.sendMessage(m.chat, { text: tek }, { quoted: m });
    }
}

function clockString(ms) {
    let d = isNaN(ms) ? "" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "" : Math.floor(ms / 1000) % 60
    return [d, " Day ", h, " O'clock ", m, " Minute ", s, " Second"].map(v => v.toString().padStart(2, 0)).join("")
}
