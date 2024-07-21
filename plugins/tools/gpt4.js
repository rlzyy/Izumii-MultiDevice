import { gpt4 } from "../../storage/script/ai.js";

export default {
    command: ["gpt"],
    description: "AI uses gpt4",
    example: "Example: %p%cmd Hallo",
    name: "gpt",
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
	const result = await gpt4(m.text);
	await func.delay(500)
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
