import { createHash } from "crypto"

export default {
    command: ["daftar", "register", "registrasi"],
    description: "Register to be able to use the menu",
    example: "",
    name: "register",
    tags: "main",

    run: async(m, { conn, text }) => {
        let number = /[0-9]{1,3}/i, user = db.users[m.sender]
        let data = text.match(number), equality = Object.values(db.users).map(v => v.name)

        if (!data[0]) return m.reply(`Example: ${m.prefix + m.command} izumii 16`)
        let name = data.input.split(data[0])[0].trim(), sn = createHash("md5").update(m.sender).digest("hex")

        if (user.registered) return m.reply("You are already registered, do you want to re-register? Type .unreg [sn]")
        if (equality.includes(name)) return m.reply("Username is already in use, try adding numbers or special characters")

        user.name = name
        user.age = data[0]
        user.registered = true
        user.regTime = +new Date;
        m.reply(`Congratulations, registration has been successful!\n\n• *Name:* ${name}\n• *Age:* ${data[0]}\n• *Serial Number:* ${sn}\n\nThank you for registering. You can check your profile by typing *.profile*`)
    }
}
