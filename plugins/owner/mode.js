export default {
    command: ["self", "public"],
    description: "Mengubah mode bot ke public & self",
    example: "",
    name: "mode",
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