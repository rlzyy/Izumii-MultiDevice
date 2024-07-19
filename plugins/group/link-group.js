export default {
    command: ["linkgroup", "linkgc", "linkgrup"],
    description: "Take the group link and share it with members",
    example: "",
    name: "linkgroup",
    tags: "group",

    botAdmin: true,
    group: true,

    run: async(m, { conn }) => {
        m.reply("https://chat.whatsapp.com/" + await conn.groupInviteCode(m.chat))
    }
}
