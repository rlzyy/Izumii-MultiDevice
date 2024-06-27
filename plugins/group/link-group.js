export default {
    command: ["linkgroup", "linkgc", "linkgrup"],
    description: "Mengambil link group dan membagikan ke member",
    example: "",
    name: "linkgroup",
    tags: "group",

    botAdmin: true,

    run: async(m, { conn }) => {
        m.reply("https://chat.whatsapp.com/" + await conn.groupInviteCode(m.chat))
    }
}