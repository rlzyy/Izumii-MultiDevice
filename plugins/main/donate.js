export default {
    command: ["donasi"],
    description: "Bantu owner dengan donasi",
    example: "",
    name: "donasi",
    tags: "main",

    register: true,

    run: async (m, { conn }) => {
    await conn.sendMessage(m.chat, { image: { url: "https://pomf2.lain.la/f/ojyx0bp.jpg" }, caption: 'Bantu Developer Dengan Cara Berdonasi Agar Developer Semangat Buat Update' }, { quoted: m })
        }
}
