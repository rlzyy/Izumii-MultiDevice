export default {
  command: ["instagram", "ig"],
  description: "Download Instagram videos/images",
  example: "Example: %p%cmd <URL>",
  name: "instagram",
  tags: "download",

  run: async (m, { conn, args }) => {
if (!/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/i.test(args[0]))
		throw `Link Invalid!`;
    let response;
    const apiUrl = API("itzpire", "/download/instagram", { url: args[0] });
    try {
      response = await func.fetchJson(apiUrl);
    } catch (err) {
      return m.reply("An error occurred while fetching the Instagram reel.");
    }
    if (!response || response.status !== "success" || !response.data) {
      return m.reply("Failed to fetch Instagram video/image.");
    }
    const videoUrl = response.data
    if (!videoUrl) {
      return m.reply("Video URL not found.");
    }
    try {
      await conn.sendMessage(m.chat, {
                    video: {
                        url: videoUrl
                    },
                    caption: 'Successfully downloading Instagram videos'
                }, {
                    quoted: m
                })
    } catch (err) {
      conn.logger.error(err);
      m.reply("Error feature, please try again");
    }
  },
};
