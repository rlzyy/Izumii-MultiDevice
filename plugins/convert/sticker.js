export default {
    command: ["s", "sticker", "sticker"],
    description: "Membuat stiker",
    example: "",
    name: "sticker",
    tags: "convert",

    run: async(m, { conn, text, command }) => {
    const quoted = m.isQuoted ? m.quoted : m;

    if (/image|video|webp/i.test(quoted.mime)) {
      m.reply("Waiting...");

      const buffer = await quoted.download();
      if (quoted?.msg?.seconds > 10) return m.reply(`Max video 9 seconds`);

      let exif = {
        packName: global.packname,
        packPublish: global.wm,
      };

      if (m.text) {
        let [packname, author] = m.text.split("|");
        exif.packName = packname ? packname : "";
        exif.packPublish = author ? author : "";
      }

      m.reply(buffer, { asSticker: true, ...exif });
    } else if (m.mentions[0]) {
      m.reply("Waiting...");
      let url = await conn.profilePictureUrl(m.mentions[0], "image");
      let buffer = await fetch(url).then((res) => res.buffer());
      m.reply(buffer, { asSticker: true, ...exif });
    } else if (
      /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i.test(m.text)
    ) {
      m.reply("Waiting...");
      let url = m.text.match(
        /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i,
      )[0];
      let buffer = await fetch(url).then((res) => res.buffer());
      m.reply(buffer, { asSticker: true, ...exif });
    } else {
      m.reply(`Method Not Support`);
    }
      }
  };