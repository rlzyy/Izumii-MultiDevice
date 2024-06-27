import os from "os"
import { performance } from "perf_hooks"

export default {
    command: ["ping", "speed"],
    description: "Mengetest kecepatan respon bot",
    example: "",
    name: "ping",
    tags: "info",

    run: async(m) => {
	    let old = performance.now()
        m.reply(`Server Information\n\n- ${os.cpus().length} CPU: ${os.cpus()[0].model}\n\n- Uptime: ${Math.floor(os.uptime() / 86400)} days\n- Ram: ${func.formatSize(os.totalmem() - os.freemem())} / ${func.formatSize(os.totalmem())}\n- Speed: ${(performance.now() - old).toFixed(3)} s`)
    }
}