export function before(m, { conn }) {
  let user = global.db.users[m.sender];

  // Ends AFK status when sending a message
  if (user.afk > -1) {
    m.reply(`
You have stopped AFK${user.afkReason ? " after " + user.afkReason : ""}
Selama ${((new Date() - user.afk) / 1000 / 60).toFixed(1)} minute
        `);
    user.afk = -1;
    user.afkReason = "";
  }

  // Checks if the flagged user is AFK
  let jids = [
    ...new Set([
      ...(m.mentionedJid || []),
      ...(m.quoted ? [m.quoted.sender] : []),
    ]),
  ];
  for (let jid of jids) {
    let mentionedUser = global.db.users[jid];
    if (!mentionedUser) continue;
    let afkTime = mentionedUser.afk;
    if (!afkTime || afkTime < 0) continue;
    let reason = mentionedUser.afkReason || "";
    m.reply(`
Don't tag him!
He's AFK ${reason ? "with reason " + reason : "no reason"}
During ${((new Date() - afkTime) / 1000 / 60).toFixed(1)} minute
        `);
  }
  return true;
}
