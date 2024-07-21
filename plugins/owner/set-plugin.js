export default {
    command: ["sf"],
    description: "Save the plugin file to the plugins directory",
    example: "Example: %p%cmd owner/add",
    name: "sf",
    tags: "owner",

    owner: true,
    quoted: true,

    run: async(m, { text }) => {
        text = text.endsWith(".js") ? text.split(".js")[0] : text
        func.fs.writeFileSync("plugins/" + text + ".js", m.quoted.body)
        m.reply("Plugin files " + text + " has been saved")
    }
}
