export default {
    command: ["sf"],
    description: "Menyimpan file plugin ke direktori command",
    example: "Example: %p%cmd owner/add",
    name: "sf",
    tags: "owner",

    owner: true,
    quoted: true,

    run: async(m, { text }) => {
        text = text.endsWith(".js") ? text.split(".js")[0] : text
        func.fs.writeFileSync("command/" + text + ".js", m.quoted.body)
        m.reply("File plugin " + text + " telah disimpan")
    }
}