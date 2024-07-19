export default {
    command: ["self", "public"],
    description: "Change bot mode to public & self",
    example: "",
    name: "self/public",
    tags: "owner",

    owner: true,

    run: async(m, { conn, command }) => {
if (command == "self") {
			m.reply("Bot switches to *Self* mode")
			global.db.settings.self = true
		} else if (command == "public") {
			m.reply("Bot switches to *Public* mode")
			global.db.settings.self = false
		} 
    }
}
