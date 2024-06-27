import cp from 'child_process'
import {
    promisify
} from 'util'
let exec = promisify(cp.exec).bind(cp)

export default {
    command: ["gp"],
    description: "Mengambil fitur file plugins",
    example: "",
    name: "getplugins",
    tags: "owner",

    owner: true,

    run: async(m, { conn, command, text }) => {
let ar = Object.keys(plugins)
    if (!text) throw `uhm.. where the text?\n\nexample:\n${m.prefix + command} main/helper`
    let o
    try {
        o = await exec('cat command/' + text + '.js')
    } catch (e) {
        o = e
    } finally {
        let {
            stdout,
            stderr
        } = o
        if (stdout.trim()) m.reply('Wm: @Irull2nd\n\n' + stdout)
        if (stderr.trim()) m.reply(stderr)
    }
    }
}