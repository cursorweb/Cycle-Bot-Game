import * as Discord from "discord.js";
import { Command, Colors, Bot, Database, brackets, commanum, constrain } from "../../global";
import { items } from "../../util/data/item";

class C extends Command {
  names = ["inventory", "inv", "i"];
  help = "View your inventory.";
  examples = ["i 2"];

  get cooldown() { return 5; }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [1]);
    if (args[0] && isNaN(Number(args[0]))) return Bot.errormsg(msg, "The page must be a number!");

    let user = Database.getUser(msg.author.id);
    let page = constrain(Number(args[0] || 1), 1, Infinity);
    // todo: emoji
    let data = Object.keys(user.inv).map(i => `x**${user.inv[Number(i)]}** ${brackets(items[Number(i)].name)}`);

    Bot.carousel(msg, data, 10, (_, itm) => {
      if (itm.length == 0) {
        return {
          color: Colors.WARNING,
          title: "Empty Page",
          description: "No items here!"
        };
      } else {
        return {
          color: Colors.SUCCESS,
          title: "Inventory",
          description: itm.join("\n"),
          footer: { text: `Page ${page}` }
        };
      }
    }, page);
  }
}

export const c = new C();