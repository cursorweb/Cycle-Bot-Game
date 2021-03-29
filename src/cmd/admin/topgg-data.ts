import fetch from "node-fetch";
import * as Discord from "discord.js";
import { Command, Colors, Bot, codestr } from "../../global";

class C extends Command {
  names = ["admin-update-topgg"];
  help = "Update top.gg data.";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], client: Discord.Client) {
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
        embed: {
          color: Colors.SUCCESS,
          title: "Success!",
          description: "Successfully sent data to top.gg."
        }
      });
    }).catch(e => {
      Bot.errormsg(msg, `An error occured.
**ERROR**
${codestr(e, "js")}`);
    });
  }
}

export const c = new C();