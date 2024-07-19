import { createHash } from "crypto"

export default {
    command: ["unreg", "unregister"],
    description: "Deleting your account on the bot database",
    example: "Example: %p%cmd sn",
    name: "unreg",
    tags: "main",

    register: true,

    run: async(m, { args }) => {
        let user = db.users[m.sender]
        let sn = createHash("md5").update(m.sender).digest("hex")

        if (args[0] !== sn) return m.reply("Incorrect serial number, please check your serial number by typing *.ceksn*")
        m.reply("Unregister was successful, now your data has been deleted")
        user.age = 0
        user.name = ""
        user.regTime = -1
        user.registered = false
    }
}
