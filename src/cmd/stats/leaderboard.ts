import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, brackets, commanum, constrain, parseNumber } from "../../global";

class C extends Command {
  names = ["leaderboard", "scoreboard", "lb", "l"];
  help = "Get the leaderboard!";
  examples = ["lb 5", "lb"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [1]);
    const num = parseNumber(args[0]);
    if (args[0] && isNaN(num)) return Bot.usererr(msg, "The page must be a number!");

    const page = constrain(num || 1, 1, Infinity);
    const data = Object.keys(Database.pdb).map(n => ({ name: Database.pdb[n].name, cycles: Database.pdb[n].cycles })).sort((a, b) => new Big(b.cycles).minus(new Big(a.cycles)).toNumber());

    Bot.carousel(msg, data, 10, (pg, itm) => {
      let out: Discord.EmbedFieldData[] = [];
      if (itm.length == 0) out = [{ name: "Empty Page", value: "No users here!" }];
      else {
        const st = 10 * (pg - 1) + 1; // start

        const col1 = itm.slice(0, 5).map((n, i) => `${st + i}. ${n.name == msg.author.tag ? "**" : ""}${n.name}${n.name == msg.author.tag ? "**" : ""} ${brackets(commanum(n.cycles))}`);
        const col2 = itm.slice(5).map((n, i) => `${st + i + 5}. ${n.name == msg.author.tag ? "**" : ""}${n.name}${n.name == msg.author.tag ? "**" : ""} ${brackets(commanum(n.cycles))}`);

        if (col1.length > 0) out.push({ name: `${st}-${st + 4}`, value: col1.join("\n"), inline: true });
        if (col2.length > 0) out.push({ name: `${st + 5}-${st + 9}`, value: col2.join("\n"), inline: true });

        if (page == 1) {
          const user = Database.getUser(msg.author.id);
          let index = 0;

          if (!itm.findIndex(n => n.name == user.name)) {
            index = data.findIndex(n => n.name == user.name);
          }

          out.push({
            name: user.name,
            value: `${index + 1}. **${user.name}** ${brackets(commanum(user.cycles))}`
          });
        }
      }

      return {
        color: Colors.PRIMARY,
        title: "Leaderboard",
        description: `View page ${brackets(pg.toString())}`,
        fields: out
      };
    }, page);
  }
}

export const c = new C();