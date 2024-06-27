export default {
    command: ["tqto"],
    description: "Developer Credits",
    example: "",
    name: "tqto",
    tags: "main",

    run: async(m, { conn, text, command }) => {
        await conn.sendMessage(m.chat, {
            text:  `Thanks to:\n\n- my God\n- AlisaDev (Base Maker)\n- Irull2nd (Creator)\n- Muhammad Adriansyah (Support)\n- Suryanjana\n- Rippanteq7 (Support)\n- IFTXH a.k.a Ifungkas\n- AditKanaeruu (Support)\n- Putu\n- Miftah (Rest Api Provider)\n- Arifzyn\n- KyuuRzy\n- Hyuu\n- KiiCode\n- Yogi\n- *XYZ Teams*\n\n\n Thank you for all God bless you.`,
        }, {
            quoted: m,
            mentions: [m.sender]
        })
      }
  };