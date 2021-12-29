import * as Discord from "discord.js";
import fetch from "node-fetch";
import { Command, Colors, Database, Bot, codestr } from "../../../global.js";

class C extends Command {
  names = ["admin-all"];
  help = "Backs up the database, prunes users, and updates top.gg.";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], client: Discord.Client) {
    Database.saveBackup();
    Database.pruneUsers();

    const guildCount = client.guilds.cache.size;

    fetch("https://top.gg/api/bots/781939317450342470/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.TOPGG || ""
      },
      body: JSON.stringify({
        // eslint-disable-next-line camelcase
        server_count: guildCount
      })
    }).then(() => {
      msg.channel.send({
        embeds: [{
          color: Colors.SUCCESS,
          title: "Successfully backed-up the database! Pruned users, and updated top.gg!",
          footer: { text: "Note: Use restore to actually restore the database." }
        }]
      });
    }).catch(e => {
      Bot.errormsg(msg, `An error occured.
**ERROR**
${codestr(e, "js")}`);
    });
  }
}

export const c = new C();