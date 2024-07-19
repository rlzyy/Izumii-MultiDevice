const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))

export default {
    command: ["join"],
    description: "Join the group",
    example: "",
    name: "join",
    tags: "group",

    owner: true,

    run: async(m, { conn, text, isAdmin, isBotAdmin }) => {
        try {
    let [_, code] = text.match(/chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i) || []
    if (!code) return m.reply('Link invalid');
    let res = await conn.groupAcceptInvite(code)
    m.reply(`Successfully Joined Group`)
} catch (e) {
throw eror
}
    }
}
