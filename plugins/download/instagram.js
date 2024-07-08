export default {
  command: ["instagram", "ig"],
  description: "Download Instagram video/image",
  example: "Example: %p%cmd <URL>",
  name: "instagram",
  tags: "download",

  run: async (m, { conn, args }) => {
if (!/https?:\/\/(www\.)?instagram\.com/i.test(args[0]))

		throw `Link Invalid!`;

    let response;
    const apiUrl = API("fumi", "/api/instagram", { url: args[0] });

    try {
      response = await func.fetchJson(apiUrl);
    } catch (err) {
      return m.reply("An error occurred while fetching the Instagram reel.");
    }

    if (!response || response.status !== 200 || !response.data) {
      return m.reply("Failed to fetch Instagram video/image.");
    }

    
    const videoUrl = response.data.response[0].url;

    if (!videoUrl) {
      return m.reply("Video URL not found.");
    }

    try {
    let start = new Date();
  let sp = `${((new Date - start) * 1)}`
  let cap = `🍟 *Fetching* ${sp} ms`
      await m.reply(videoUrl, { caption: cap });
    } catch (err) {
      conn.logger.error(err);
      m.reply("error");
    }
  },
};
