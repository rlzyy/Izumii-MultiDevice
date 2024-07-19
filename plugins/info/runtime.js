export default {
    command: ["runtime", "uptime", "rt"],
    description: "Runtime or Uptime of the bot",
    example: "",
    name: "runtime",
    tags: "info",

    run: async(m) => {
        m.reply(await func.runtime(process.uptime()))
    }
}
