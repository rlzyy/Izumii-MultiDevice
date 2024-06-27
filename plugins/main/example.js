export default {
    command: ["example"],
    description: "",
    example: "",
    name: "",
    tags: "",

    run: async(m, { conn, text, command }) => {
    const tek = `
    export default {
    //just leave it blank if you want to turn it off
    command: [""],
    description: "",
    example: "", //%p = prefix, %cmd = command, %text = teks
    name: "",
    tags: "",

    //change it to true if you want to turn it on
    admin: false,
    botAdmin: false,
    group: false,
    limit: false,
    loading: false,
    owner: false,
    premium: false,
    private: false,
    quoted: false,
    register: false,
    media: {
        audio: false,
        image: false,
        sticker: false,
        video: false
    },

    run: async(m, { conn, text, args, isPrem, command }) => {
        //your script code
        example: m.reply('hallo mas irul')
    }
};
    `
        await conn.sendMessage(m.chat, {
            text: tek,
        }, {
            quoted: m,
            mentions: [m.sender]
        })
      }
  };