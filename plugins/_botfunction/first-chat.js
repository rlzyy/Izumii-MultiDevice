export async function before(m) {
    if (m.chat.endsWith("broadcast") || m.fromMe || m.isGroup || m.isCommand) return

    let user = db.users[m.sender]
    let txt = `Waduh, akhirnya kamu nyasar ke sini juga! Tenang, ${global.name} nggak gigit, kok. Malah, aku bakal kasih banyak info dan kemudahan. Gak percaya? Coba deh ketik .menu`

    if (new Date() - user.firstchat < 21600000) return

    conn.reply(m.chat, txt, m)
    user.firstchat = new Date * 1
}