export async function before(m) {
    if (m.chat.endsWith("broadcast") || m.fromMe || m.isGroup || m.isCommand) return

    let user = db.users[m.sender]
    let txt = `Wow, you finally strayed here too! Calm, ${global.name} I don't bite, okay? In fact, I will give you lots of information and convenience. Do not believe? Try typing .menu`

    if (new Date() - user.firstchat < 21600000) return

    conn.reply(m.chat, txt, m)
    user.firstchat = new Date * 1
}
