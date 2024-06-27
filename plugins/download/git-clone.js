export default {
    command: ["gitclone", "git"],
    description: "Mengunduh file dari github",
    example: "Example: %p%cmd " + link + "/legacyv3",
    name: "gitclone",
    tags: "download",

    limit: true,

    run: async(m, { conn, args }) => {
        let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

        if (!regex.test(args[0])) return m.reply("Repositories tidak ditemukan")

        let [_, user, repo] = args[0].match(regex) || []
        repo = repo.endsWith(".git") ? repo.split(".git")[0] : repo
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`, fileName = (await func.axios.head(url)).headers.get("content-disposition").match(/attachment; filename=(.*)/)[1]

        conn.sendMessage(m.chat, { document: { url }, mimetype: "application/zip", fileName }, { quoted: m })
    }
}