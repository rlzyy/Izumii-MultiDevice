export default {
    command: ["df"],
    description: "Remove plugin files from command directory",
    example: "Example: %p%cmd owner/add",
    name: "df",
    tags: "owner",

    owner: true,

    run: async(m, { text }) => {
        let plugin = Object.keys(plugins).map(v => v.replace(/.js/g, "").split("plugins/")[1])

        if (!plugin.includes(text)) return m.reply("Plugin file not found\n\n" + plugin.map(v => " " + v).join("\n"))

        func.fs.unlinkSync("plugins/" + text + ".js")
        m.reply("Plugin files " + text + " was removed")
    }
}
