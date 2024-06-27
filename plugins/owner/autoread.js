export default {
    command: ["onread", "offread"],
    description: "Centang 2",
    example: "",
    name: "autoread",
    tags: "owner",

    owner: true,

    run: async(m, { conn, args, command }) => {
    if (command == "onread") {
			m.reply("Auto read is active")
			global.db.settings.autoread = true
		} else if (command == "offread") {
			m.reply("Auto read is disabled")
			global.db.settings.autoread = false
		} 
  }
}