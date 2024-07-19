const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m) {
    if (m.isBaileys || !m.isGroup) return false

    const chat = global.db.chats[m.chat]
    const isGroupLink = linkRegex.exec(m.body)
    const kickMessage = "Group Link Detected\n\nSorry, we have a policy that prohibits sending WhatsApp group links in this group. We hope you will comply with these rules to maintain a safe and secure environment"
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
