//The code will work in the next update

export default {
    command: ["ytplay", "play"],
    description: "Search for YouTube audio/video",
    example: "",
    name: "play",
    tags: "download",

    limit: true,

    run: async(m) => {
 try {
    m.reply('Coming Soon!');
  } catch (e) {
    console.log(e);
  }
  }
}
