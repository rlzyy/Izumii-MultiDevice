import { blackbox } from "../../storage/script/ai.js";

export default {
    command: ["blackbox"],
    description: "AI Engine Blackbox AI",
    example: "Example: %p%cmd Hi",
    name: "blackbox",
    tags: "tools",

    run: async(m, { conn, text, command }) => {
    try {
    const {
            key
        } = await conn.sendMessage(m.chat, {
            text: global.mess.loading
        }, {
            quoted: m,
            mentions: [m.sender]
        })
        const input = [{
            role: "user",
            content: m.text
        }]
	const result = await blackbox(input);
	await func.delay(1000)
        await conn.sendMessage(m.chat, {
            text:  `${result}`,
            edit: key
        }, {
            quoted: m,
            mentions: [m.sender]
        })
        } catch (e) {
        await m.reply('Error request failed');
        }
      }
  };
