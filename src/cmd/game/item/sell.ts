import * as Discord from "discord.js";
import Big from "bignumber.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Command, Colors, Bot, plural, parseNumber, Database, brackets, commanum, constrain } from "../../../global.js";
import { items } from "../../../util/data/item.js";

class C extends Command {
  names = ["sell", "s"];
  help = "Sell your items for cycles!";
  examples = ["sell coffee", "sell 'chest chest' 2"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length < 1 || args.length > 2) return Bot.argserror(msg, args.length, [1, 2]);

    const name = args[0];
    const amt = parseNumber(args[1] || "1");
    if (args[1] && isNaN(amt)) return Bot.usererr(msg, "The amount must be a number!");
    const num = new Big(constrain(amt, 1, 50));

    const user = Database.getUser(msg.author.id);
    let itemIndex = items.findIndex(n => n.name.toLowerCase() == name.toLowerCase());
    if (itemIndex == -1) itemIndex = items.findIndex(n => n.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    if (itemIndex == -1) {
      return Bot.usererr(msg, `The item ${brackets(name)} was not found!
Chock your spelling!`, "Item not found!");
    }

    const item = items[itemIndex];
    const userAmt = new Big(user.inv[itemIndex] || 0);
    const cycles = new Big(user.cycles);

    if (userAmt.lt(amt)) {
      return Bot.errormsg(msg, `You don't have enough of ${brackets(item.name)}!
**You still need** ${brackets(commanum(num.minus(userAmt).toString()))} **more!**`);
    }

    if (item.currency) {
      return Bot.errormsg(msg, `You can't sell currency!
These currencies cannot be converted into cycles!`);
    }

    const worth = new Big((1 - item.dropChance / 100) / 2);
    // every item is worth at most 100
    const cycleAmt = worth.times(100).times(amt).dp(0);
    user.inv[itemIndex] = userAmt.minus(num).toString();
    user.cycles = cycles.plus(cycleAmt).toString();

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Success!",
        description: `You successfully sold ${brackets(item.name)} x**${amt}**!
It was worth ${brackets(commanum(cycleAmt.toString()))} cycles!
You now have ${brackets(commanum(user.cycles))} cycles!`
      }]
    });
  }
}

export const c = new C();
