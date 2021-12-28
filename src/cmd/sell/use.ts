import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, brackets, constrain, parseNumber } from "../../global";
import { items } from "../../util/data/item";
import { openItem } from "../../util/data/open-item";
import { commanum } from "../../util/util";

class C extends Command {
  names = ["use", "eat", "u", "open", "drink", "open-item"];
  help = "Use an item!";
  examples = ["use coffee"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1 && args.length != 2) return Bot.argserror(msg, args.length, [1, 2]);
    const num = parseNumber(args[1]);
    if (args[1] && isNaN(num)) return Bot.usererr(msg, "The amount must be a number!");

    const name = args[0];
    const amount = constrain(num || 1, 1, 50);
    const user = Database.getUser(msg.author.id);

    let itmIndex = items.findIndex(o => o.name.toLowerCase() == name.toLowerCase());
    if (itmIndex == -1) itmIndex = items.findIndex(i => i.name.toLowerCase().indexOf(name.toLowerCase()) > -1);

    const item = items[itmIndex];
    const userAmt = new Big(user.inv[itmIndex] || 0);
    const open = openItem[itmIndex];

    if (itmIndex == -1) return Bot.usererr(msg, `Item ${brackets(name)} not found. Check your spelling!`, "Item not found!");
    if (!user.inv[itmIndex] || userAmt.lt(amount)) return Bot.errormsg(msg, `You don't have enough of this item! You still need ${brackets(commanum(userAmt.negated().plus(amount).toString()))} more!`);
    if (!open) {
      return Bot.errormsg(msg, `This kind of item can't be used!
It might be used in a shop, however.`, "Item can't be used!");
    }

    user.inv[itmIndex] = userAmt.minus(amount).toString();
    const result = open(user, amount);
    msg.channel.send({
      embeds: [{
        title: "Using item!",
        color: Colors.SUCCESS,
        description: `You use **x${commanum(amount.toString())}** ${brackets(item.name)} ...`,
        fields: [result]
      }]
    });
  }
}

export const c = new C();