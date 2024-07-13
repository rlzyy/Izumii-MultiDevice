export default {
    command: ["inspect"],
    description: "Menampilkan informasi dari media",
    example: "",
    name: "inspect",
    tags: "tools",

    run: async (m, { store }) => {
        const data = m.isQuoted ? m.quoted : m
        if (!data) throw 'Reply Messages!';
        const res = global.store.messages[m.chat].array.find(m => m.key.id === data.key.id)

        m.reply(JSON.stringify(res, null, 2))
    }
}
