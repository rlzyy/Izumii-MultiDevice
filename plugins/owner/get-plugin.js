import cp from 'child_process'
import {
    promisify
} from 'util'
let exec = promisify(cp.exec).bind(cp)

export default {
    command: ["gp"],
    description: "Mengambil fitur file plugins",
    example: "uhm.. where the text?\n\nexample:\n%p%cmd main/helper",
    name: "getplugins",
    tags: "owner",

    owner: true,

    run: async(m, { conn, text }) => {
let ar = Object.keys(plugins)
    let o
    try {
        o = await exec('cat plugins/' + text + '.js')
    } catch (e) {
        o = e
    } finally {
        let {
            stdout,
            stderr
        } = o
        if (stdout.trim()) m.reply('WM: @Irull2nd\n\n' + stdout)
        if (stderr.trim()) m.reply(stderr)
    }
    }
}
