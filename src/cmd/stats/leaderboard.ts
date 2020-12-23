import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, brackets, commanum, constrain } from "../../global";

class C extends Command {
  names = ["leaderboard", "scoreboard", "lb", "l"];
  help = "Get the leaderboard!";
  examples = ["lb 5", "lb"];
  isGame = 'n' as 'n';

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [1]);
    if (args[0] && isNaN(Number(args[0]))) return Bot.errormsg(msg, "The page must be a number!");
    
    let page = constrain(Number(args[0] || 1), 1, Infinity);
    let data = Object.keys(Database.pdb).map(n => ({ name: Database.pdb[n].name, cycles: Database.pdb[n].cycles })).sort((a, b) => new Big(b.cycles).minus(new Big(a.cycles)).toNumber());

    Bot.carousel(msg, data, 10, (pg, itm) => {
      let out: Discord.EmbedFieldData[] = [];
      if (itm.length == 0) out = [{ name: "Empty Page", value: "No users here!" }];
      else {
        let st = 10 * (pg - 1) + 1; // start

        let col1 = itm.slice(0, 5).map((n, i) => `${st + i}. ${n.name == msg.author.tag ? "**" : ""}${n.name}${n.name == msg.author.tag ? "**" : ""} ${brackets(commanum(n.cycles.toString()))}`);
        let col2 = itm.slice(5).map((n, i) => `${st + i + 5}. ${n.name == msg.author.tag ? "**" : ""}${n.name}${n.name == msg.author.tag ? "**" : ""} ${brackets(commanum(n.cycles.toString()))}`);

        if (col1.length > 0) out.push({ name: st + "-" + (st + 4), value: col1.join('\n'), inline: true });
        if (col2.length > 0) out.push({ name: (st + 5) + "-" + (st + 9), value: col2.join('\n'), inline: true });
      }

      return {
        color: Colors.PRIMARY,
        title: "Leaderboard",
        description: `View page ${brackets(pg.toString())}`,
        fields: out!
      }
    }, page);
  }
}

export const c = new C();