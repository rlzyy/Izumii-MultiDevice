export default {
    command: ["del"],
    description: "Afk dalam group",
    example: "",
    name: "afk",
    tags: "group",

    group: true,

    run: async(m, { conn, text, isAdmin, isBotAdmin }) => {
        if (!m.quoted) throw '*reply the message you want to delete.*'
try {
let bilek = m.message.extendedTextMessage.contextInfo.participant
let banh = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: banh, participant: bilek }})
 } catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}
    }
}