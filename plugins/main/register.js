import { createHash } from "crypto"

export default {
    command: ["daftar", "register", "registrasi"],
    description: "Register to be able to use the menu",
    example: "",
    name: "register",
    tags: "main",

    run: async(m, { conn, text, command }) => {
    let Reg = /(.*)([.|])([0-9]*)$/i
let user = global.db.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${m.prefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Incorrect format\n${m.prefix + command} <name>,<age>`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name cannot be empty (Alphanumeric)'
  if (!age) throw 'Age cannot be empty (Number)'
  user.name = name
  user.age = parseInt(age)
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
🚩 Registration successful!

╭─「 Info 」
│ Name: ${name}
│ Age: ${age}y.o
│ SN: ${sn}
╰────
`.trim())
    }
}
