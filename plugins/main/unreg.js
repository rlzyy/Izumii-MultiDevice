import { createHash } from "crypto"

export default {
    command: ["unreg", "unregister"],
    description: "Menghapus akunmu pada bot",
    example: "Example: %p%cmd sn",
    name: "unreg",
    tags: "main",

    register: true,

    run: async(m, { args }) => {
        let user = db.users[m.sender]
        let sn = createHash("md5").update(m.sender).digest("hex")

        if (args[0] !== sn) return m.reply("Serial number salah, silahkan cek serial number mu dengan mengetik *.ceksn*")
        m.reply("Unregister berhasil sekarang data anda sudah dihapus")
        user.age = 0
        user.name = ""
        user.regTime = -1
        user.registered = false
    }
}