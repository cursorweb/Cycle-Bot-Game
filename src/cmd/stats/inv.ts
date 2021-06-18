import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, brackets, commanum, parseMention, parseNumber, cleanName } from "../../global";
import { items } from "../../util/data/item";

class C extends Command {
  names = ["inventory", "inv", "i"];
  help = "View your inventory.";
  examples = ["i 2"];

  get cooldown() {
    return 5;
  }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);
    const arg0 = parseNumber(args[0], true);
    let user = Database.getUser(msg.author.id);

    // really stressing our NaN == false here
    if (!arg0) {
      const parsedId = parseMention(args[0] || msg.author.id);

      if (parsedId.type == "id") {
        user = Database.getUser(parsedId.value);
        if (!user) return Bot.errormsg(msg, `User ${brackets(`<@${parsedId.value}>`)} not found. Check your spelling!`, "User not found!");
      } else {
        const userArr = Database.findUser(u => u.name.toLowerCase().indexOf(parsedId.value.toLowerCase()) > -1);
        if (userArr.length == 0) return Bot.usererr(msg, `User ${brackets(parsedId.value)} not found. Check your spelling!`, "User not found!");
        else if (userArr.length > 1) {
          return Bot.errormsg(msg, `Found ${brackets(userArr.length.toString())} users.
${userArr.slice(0, 10).map(o => `${brackets(cleanName(Database.getUser(o).name))}: **${o}**`).join("\n")}`, "Multiple users found!");
        }
        user = Database.getUser(userArr[0]);
      }
    }

    const page = arg0 || 1;
    // todo: emoji
    const data = Object.keys(user.inv).filter(i => new Big(user.inv[Number(i)]).gt(0)).map(i => `x**${commanum(user.inv[Number(i)].toString())}** ${brackets(items[Number(i)].name)}`);

    Bot.carousel(msg, data, 10, (page, itm) => {
      if (itm.length == 0) {
        return {
          color: Colors.WARNING,
          title: "Empty Page",
          description: "No items here!",
          footer: { text: `Page: ${page}` }
        };
      }
      return {
        color: Colors.SUCCESS,
        title: "Inventory",
        description: itm.join("\n"),
        footer: { text: `Page ${page}` }
      };

    }, page);
  }
}

export const c = new C();