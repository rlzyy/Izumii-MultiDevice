export default {
    command: ["hidetag"],
    description: "Tag all members in the group",
    example: "Example: %p%cmd hidetag everyone",
    name: "hidetag",
    tags: "group",

    group: true,
    admin: true,

    run: async(m, { conn, text, participants }) => {
    const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Hi!!"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

    conn.sendMessage(m.chat, { text: text, mentions: m.metadata.participants.map(a => a.id) }, {quoted:fkontak})
    }
}
