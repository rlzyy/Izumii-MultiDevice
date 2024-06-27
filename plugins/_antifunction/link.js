const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m) {
    if (m.isBaileys || !m.isGroup) return false

    const chat = global.db.chats[m.chat]
    const isGroupLink = linkRegex.exec(m.body)
    const kickMessage = "Tautan Group Terdeteksi\n\nMaaf, kami memiliki kebijakan yang melarang pengiriman tautan grup WhatsApp di grup ini. Kami berharap Anda dapat mematuhi aturan ini untuk menjaga lingkungan yang aman dan terhindar dari spam. Terima kasih atas kerjasama Anda."

    if (chat.antilink && isGroupLink && !m.isAdmin) {
        let thisGroup = "https://chat.whatsapp.com/" + await conn.groupInviteCode(m.chat)
        
        if (m.body.includes(thisGroup)) return false
        if (m.isBotAdmin) {
            await m.reply(kickMessage)
            conn.sendMessage(m.chat, { delete: m.key })
            conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        }
    }

    return true
}