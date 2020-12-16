import * as Discord from "discord.js";
import { Command, Colors, Database, brackets, Bot } from "../../global";
import { items } from "../../util/data/shop";

class C extends Command {
  names = ["buy", "b"];
  help = "Buy an item from the shop!";
  examples = ['buy idle "cookie cutter"', 'buy idle "cookie cutter" 50'];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    // todo: add the shop type
    if (args.length != 1 && args.length != 2) Bot.argserror(msg, args.length, [1, 2]);

    let itm = args[0];
    let amt = Number(args[1] || 1);

    let itmIndex = items.upgrade.findIndex(o => o.name.toLowerCase().indexOf(itm.toLowerCase()) > -1);
    if (itmIndex == -1) {
      return Bot.errormsg(msg, `Item ${brackets(itm)} not found. Check your spelling!`, "Item not found!")
    } else {
      msg.channel.send(`u want to buy ${items.upgrade[itmIndex].name}, which is nice, and also ${amt} too.`)
    }

    // msg.channel.send("TODO: make sure to like parse the args.\nargs: " + args.join(","));
  }
}

export const c = new C();