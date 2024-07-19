export default {
    command: ["banchat"],
    description: "Banchat chat in the group",
    example: "",
    name: "banchat",
    tags: "owner",

    owner: true,

    run: async(m, { conn, command }) => {
			m.reply("*Success* Banned Chat")
			db.chats[m.chat].isBanned = true
	} 
}
