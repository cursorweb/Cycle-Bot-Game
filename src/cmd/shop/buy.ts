import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, constrain, Database, brackets, Bot, calcCost, commanum } from "../../global";
import { items } from "../../util/data/shop";

class C extends Command {
  names = ["buy", "b"];
  help = "Buy an item from the shop!";
  examples = ['buy idle "cookie cutter"', 'buy idle "cookie cutter" 50'];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    // todo: add the shop type
    if (args.length != 1 && args.length != 2) Bot.argserror(msg, args.length, [1, 2]);

    let itm = args[0];
    let amt = constrain(Number(args[1] || 1), 1, 50);

    let user = Database.getUser(msg.author.id);

    let itmIndex = items.upgrade.findIndex(o => o.name.toLowerCase().indexOf(itm.toLowerCase()) > -1);
    let item = items.upgrade[itmIndex];
    if (itmIndex == -1) {
      return Bot.errormsg(msg, `Item ${brackets(itm)} not found. Check your spelling!`, "Item not found!");
    } else {
      let cost = calcCost(item.cost, 1.07, amt, user.bought.upgrades[itmIndex] || 0);
      let cycles = new Big(user.cycles), tpc = new Big(user.tpc);

      if (cycles.lt(cost)) return Bot.errormsg(msg, `You don't have enough cycles!
**You have** ${brackets(commanum(cycles.toString()))}
**You need** ${brackets(commanum(cost.minus(cycles).toString()))}`, "Not enough Cycles!");

      user.cycles = cycles.minus(cost).toString();
      if (!user.bought.upgrades[itmIndex]) user.bought.upgrades[itmIndex] = 0;
      user.bought.upgrades[itmIndex] += amt;
      user.tpc = tpc.plus(amt * items.upgrade[itmIndex].tpc!).toString();

      msg.channel.send({
        embed: {
          title: "Transaction Successful!",
          color: Colors.SUCCESS,
          description: `Successfully bought ${brackets(item.name)}
You Spent: ${brackets(commanum(cost.toString()))}
Your TPC: ${brackets(commanum(user.tpc))}`
        }
      });
    }
  }
}

export const c = new C();