import { createHash } from "crypto"

export default {
    command: ["ceksn"],
    description: "Melihat serial number",
    example: "",
    name: "ceksn",
    tags: "main",

    register: true,

    run: async(m) => {
        let sn = createHash("md5").update(m.sender).digest("hex")
        m.reply(`*📮 SN:* ${sn}`)
    }
}