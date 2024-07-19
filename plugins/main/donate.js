export default {
    command: ["donasi"],
    description: "Help the owner with donations",
    example: "",
    name: "donasi",
    tags: "main",

    register: true,

    run: async (m, { conn }) => {
    await conn.sendMessage(m.chat, { image: { url: "https://pomf2.lain.la/f/ojyx0bp.jpg" }, caption 'Help Developers by Donating to Encourage Developers to Make Updates' }, { quoted: m })
    }
}
