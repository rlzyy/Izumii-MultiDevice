export default {
    command: ["df"],
    description: "Menghapus file plugin dari direktori command",
    example: "Example: %p%cmd owner/add",
    name: "df",
    tags: "owner",

    owner: true,

    run: async(m, { text }) => {
        let plugin = Object.keys(plugins).map(v => v.replace(/.js/g, "").split("command/")[1])

        if (!plugin.includes(text)) return m.reply("File plugin tidak ditemukan\n\n" + plugin.map(v => " " + v).join("\n"))

        func.fs.unlinkSync("command/" + text + ".js")
        m.reply("File plugin " + text + " telah dihapus")
    }
}