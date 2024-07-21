import os from "os"
import fs from "fs"

let menu = {
	before: `
Hi @%user %ucapan,\nI am an automated bot system that can help you with things like downloading, AI chat, tools, etc.

• Users: %rtotalreg / %totalreg
• Runtime Bot: %uptime
• Memory Used: %memory_used / %memory_free

%readmore`.trimStart(),
    header: "```[ %category ]```",
    body: "%cmd\n> %description",
    footer: "\n",
    after: "If you find a bug, please report it to the owner\n\n©Original Base By Irull2nd"
}

let tags = {
    "download": "Download Menu",
    "rpg": "RPG Menu",
    "convert": "Convert Menu",
    "group": "Group Menu",
    "info": "Informasi Menu",
    "main": "Main Menu",
    "owner": "Owner Menu",
    "tools": "Tools Menu"
}

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)];
  }

export default {
    command: ["menu", "help"],
    description: "To display a menu based on a list, and see how to use the menu",
    example: "",
    name: "menu",
    tags: "main",

    register: true,

    run: async(m, { conn, isPrem, text, command }) => {
        if (text.startsWith("--")) {
            let name = text.toLowerCase().replace("--", ""), data = []
            let cmd = Object.values(plugins).find(plugin => plugin.name === name)
              
            if (!cmd) return m.reply("Command not found")
            if (cmd.name) data.push("*Name:* " + cmd.name)
            if (cmd.command) data.push("*Command:* " + cmd.command.join(", "))
            if (cmd.description) data.push("*Description:* " + cmd.description)
            if (cmd.example) data.push("*Use:* " + m.prefix + cmd.command[0])

            m.reply(data.join("\n"))
        } else {
            let more = String.fromCharCode(8206)
            let readMore = more.repeat(4001)
            let totalreg = Object.keys(global.db.users).length
            let rtotalreg = Object.values(global.db.users).filter(user => user.registered == true).length
            let { level, limit, name, premium, money } = db.users[m.sender]
        	let help = Object.values(plugins).map(plugin => {
        		return {
        			cmd: Array.isArray(plugin.name) ? plugin.name : [plugin.name],
        			tags: [plugin.tags],
        			limit: plugin.limit,
        			description: plugin.description,
        			premium: plugin.premium
        		}
        	})

        	let text = [menu.before, ...Object.keys(tags).map(tag => {
        		return menu.header.replace(/%category/g, tags[tag]) + "\n" + [...help.filter(aa => aa.tags.includes(tag) && aa.cmd).map(a => {
        			return a.cmd.map(help => {
        				return menu.body.replace(/%cmd/g, m.prefix + help).replace(/%description/g, a.description).replace(/%isLimit/g, a.limit ? "(Limit)" : "").replace(/%isPremium/g, a.premium ? "(Premium)" : "").trim()
        			}).join("\n")
        		}), menu.footer].join("\n")
        	}), menu.after].join("\n")

        	text = text.replace(/%user/, m.sender.split("@")[0]).replace(/%ucapan/, ucapan).replace(/%rtotalreg/, rtotalreg).replace(/%totalreg/, totalreg).replace(/%uptime/, func.runtime(process.uptime())).replace(/%prefix/, m.prefix).replace(/%database/, Object.keys(db.users).length).replace(/%memory_used/, func.formatSize(os.totalmem() - os.freemem())).replace(/%memory_free/, func.formatSize(os.totalmem())).replace(/%name/, name).replace(/%limit/, premium ? "Infinity" : limit + "/25").replace(/%level/, level).replace(/%money/, money.toLocaleString()).replace(/%status/, premium ? "Premium" : "Free").replace(/%readmore/, readMore)
        	let typemenu = global.typemenu
        	if (typemenu === 'v1') {
        	conn.sendMessage(m.chat, { text: text.trim(),
        	   contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        mentionedJid: [m.sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: global.name,
                            newsletterJid: "120363294037953832@newsletter",
                        },
                    externalAdReply: {
                        mediaType: 1,
                        previewType: "pdf",
                        title: global.name,
                        body: wm,
                        thumbnail: timeImage,
                        renderLargerThumbnail: true,
                        sourceUrl: link
                    }
                }
            }, {
                    quoted: m
                    })
             } else if (typemenu === 'v2') {
             conn.sendOrder(m.chat, text.trim(), fs.readFileSync('./storage/media/images.jpg'), "99999999", 10000000, m)
             }
        }
    }
}
