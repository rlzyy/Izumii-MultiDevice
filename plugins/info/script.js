export default {
    command: ["sc", "source", "script"],
    description: "Source code bot",
    example: "",
    name: "script",
    tags: "info",

    run: async(m) => {
    const delay = time => new Promise(res => setTimeout(res, time));
    await delay(3000)
    return m.reply('This bot was created and developed with the purpose of *learning*.\n\nFree Script :\n- https://github.com/izumii44/Izumii-MultiDevice')
    }
 };