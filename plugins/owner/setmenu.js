export default {
    command: ["set"],
    description: "Change the bot menu type",
    example: "",
    name: "set",
    tags: "owner",

    owner: true,

    run: async(m, { conn, text, command }) => {
    if (!text) throw 'There are 2 menu settings'
                if (m.text.startsWith('v')) {
                    global.typemenu = text
                    m.reply('Successfully changed the menu type.')
                } else {
                    m.reply(`${text} There is no type menu, start with ${m.prefix + command} v1/2`)
                }
    }
}
