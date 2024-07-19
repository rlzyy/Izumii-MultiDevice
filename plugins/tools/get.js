import format from 'util';

export default {
    command: ["get"],
    description: "Retrieve json data from websites",
    example: "",
    name: "get",
    tags: "tools",

    run: async(m, { conn, text }) => {
        const irul = func.isUrl
        if (!irul(text)) throw 'url invalid, please input a valid url. Try with add http:// or https://'
	let { href: url, origin } = new URL(text)
	let res = await fetch(url, { headers: { 'referer': origin }})
	if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) throw `Content-Length: ${res.headers.get('content-length')}`
	if (!/text|json/.test(res.headers.get('content-type'))) return await conn.sendFile(m.chat, url, '', text, m)
	let txt = Buffer.from(await res.arrayBuffer())
	try {
		txt = JSON.stringify(JSON.parse(txt + ''), null, 2)
	} catch {
		txt = txt + ''
	}
	m.reply(txt.trim().slice(0, 65536) + '')
    }
}
