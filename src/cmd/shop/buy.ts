import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, constrain, Database, brackets, Bot, calcCost, commanum, codestr, parseNumber } from "../../global";
import { items, SItem } from "../../util/data/shop";

const handleBuy: { [i: string]: (user: Database.CycleUser, item: SItem, itmIndex: number, amt: number) => string[] | string } = {
  text(user, item, itmIndex, amt) {
    let cost = calcCost(new Big(item.cost), 1.07, amt, user.bought.upgrades[itmIndex] || 0);
    let cycles = new Big(user.cycles), tpc = new Big(user.tpc);

    if (cycles.lt(cost)) return [`You don't have enough cycles!
**You have** ${brackets(commanum(cycles.toString()))}
**You need** ${brackets(commanum(cost.minus(cycles).toString()))}`, "Not enough cycles!"];

    user.cycles = cycles.minus(cost).toString();
    if (!user.bought.upgrades[itmIndex]) user.bought.upgrades[itmIndex] = 0;
    user.bought.upgrades[itmIndex] += amt;
    user.tpc = tpc.plus(new Big(items.upgrades[itmIndex].tpc!).times(amt)).toString();

    return `Successfully bought ${brackets(item.name)}
    You Spent: ${brackets(commanum(cost.toString()))}
    Your TPC: ${brackets(commanum(user.tpc))}`;
  },

  post(user, item, itmIndex, amt) {
    let cost = calcCost(new Big(item.cost), 1.14, amt, user.bought.cpp[itmIndex] || 0);
    let cycles = new Big(user.cycles), cpp = new Big(user.cpp);

    if (cycles.lt(cost)) return [`You don't have enough cycles!
**You have** ${brackets(commanum(cycles.toString()))}
**You need** ${brackets(commanum(cost.minus(cycles).toString()))}`, "Not enough cycles!"];

    user.cycles = cycles.minus(cost).toString();
    if (!user.bought.cpp[itmIndex]) user.bought.cpp[itmIndex] = 0;
    user.bought.cpp[itmIndex] += amt;
    user.cpp = cpp.plus(new Big(items.cpp[itmIndex].cpp!).times(amt)).toString();

    return `Successfully bought ${brackets(item.name)}
    You Spent: ${brackets(commanum(cost.toString()))}
    Your CPP: ${brackets(commanum(user.cpp))}`;
  },

  idle(user, item, itmIndex, amt) {
    let cost = calcCost(new Big(item.cost), 1.21, amt, user.bought.idle[itmIndex] || 0);
    let coins = new Big(user.inv[0]), tpm = new Big(user.tpm);

    if (coins.lt(cost)) return [`You don't have enough Ego-Coins!
**You have** ${brackets(commanum(coins.toString()))}
**You need** ${brackets(commanum(cost.minus(coins).toString()))}`, "Not enough Ego-Coins!"];

    user.inv[0] = coins.minus(cost).toString();
    if (!user.bought.idle[itmIndex]) user.bought.idle[itmIndex] = 0;
    user.bought.idle[itmIndex] += amt;
    user.tpm = tpm.plus(new Big(items.idle[itmIndex].tpm!).times(amt)).toString();

    return `Successfully bought ${brackets(item.name)}
    You Spent: ${brackets(commanum(cost.toString()))}
    Your TPM: ${brackets(commanum(user.tpm))}`;
  }
};

// because internal api is not the same as visual rip
const map = {
  text: "upgrades",
  post: "cpp",
  idle: "idle"
};


class C extends Command {
  names = ["buy", "b"];
  help = "Buy an item from the shop!";
  examples = ['buy idle "cookie cutter"', 'buy idle "cookie cutter" 50'];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length == 0 || args.length == 1) return Bot.errormsg(msg, `The valid shop names are:
    ${codestr(Object.keys(handleBuy).join(", "), "yaml")}`, "Shop names");
    if (args.length != 2 && args.length != 3) return Bot.argserror(msg, args.length, [2, 3]);
    if (!Object.keys(handleBuy).includes(args[0])) return Bot.errormsg(msg, `The valid shop names are:
    ${codestr(Object.keys(handleBuy).join(", "), "yaml")}`, "Invalid Shop Name!");
    let num = parseNumber(args[2]);
    if (args[2] && isNaN(num)) return Bot.errormsg(msg, "The amount must be a number!");

    let itm = args[1];
    let amt = constrain(num || 1, 1, 50);

    let user = Database.getUser(msg.author.id);

    // todo: refactor
    let itmIndex: number;

    let catKey = map[args[0] as keyof typeof map] as keyof typeof items; // catalog key
    let itemCat = items[catKey];
    let potential = itemCat.findIndex(o => o.name.toLowerCase() == itm.toLowerCase());
    if (potential == -1) itmIndex = itemCat.findIndex(o => o.name.toLowerCase().indexOf(itm.toLowerCase()) > -1);
    else itmIndex = potential;

    let item = itemCat[itmIndex];

    if (itmIndex == -1) return Bot.errormsg(msg, `Item ${brackets(itm)} not found.
Check your spelling!`, "Item not found!");

    let result = handleBuy[args[0]](user, item, itmIndex, amt);
    if (Array.isArray(result)) Bot.errormsg(msg, result[0], result[1]);
    else msg.channel.send({
      embed: {
        title: "Transaction Successful!",
        color: Colors.SUCCESS,
        description: result
      }
    });
  }
}

export const c = new C();