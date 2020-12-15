import * as Discord from "discord.js";
import { Command, Colors, Database, Bot } from "../../global";

class C extends Command {
  names = ["buy", "b"];
  help = "Buy an item from the shop!";
  examples = ['buy idle "cookie cutter"', 'buy idle "cookie cutter" 50'];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    // todo: add the shop type
    if (args.length != 1 && args.length != 2) Bot.argserror(msg, args.length, [1, 2]);

    let itm = args[0];
    let amt = Number(args[1] || 1);


    Database.pdb[msg.author.id].bought.upgrades[0] = 10;
    msg.channel.send("TODO: make sure to like parse the args.\nargs: " + args.join(","));
  }
}

export const c = new C();