import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, commanum, constrain, calcPrice, brackets, codestr, parseNumber } from "../../global";
import { items } from "../../util/data/shop";

// [topic] [value]
const handleShop: { [i: string]: (user: Database.CycleUser) => string[] } = {
  text: user => items.upgrades.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.07, user.bought.upgrades[i] || 0).toString())} Cycles ]
<+${n.tpc!} TPC> <${commanum((user.bought.upgrades[i] || 0).toString())} owned>
> ${n.description}`),
  post: user => items.cpp.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.14, user.bought.cpp[i] || 0).toString())} Cycles ]
<+${n.cpp!} CPP> <${commanum((user.bought.cpp[i] || 0).toString())} owned>
> ${n.description}`),
  idle: user => items.idle.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.21, user.bought.idle[i] || 0).toString())} Ego-Coins ]
<+${n.tpm!} TPM> <${commanum((user.bought.idle[i] || 0).toString())} owned>
> ${n.description}`)
};

class C extends Command {
  names = ["shop"];
  help = "View the shop!";
  examples = ["shop idle", "shop idle 3"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length == 0) return Bot.errormsg(msg, `The valid shop names are:
    ${codestr(Object.keys(handleShop).join(", "), "yaml")}`, "Shop names");
    if (args.length != 1 && args.length != 2) return Bot.argserror(msg, args.length, [1, 2]);
    let num = parseNumber(args[1]);
    if (args[1] && isNaN(num)) return Bot.errormsg(msg, "The page must be a number!");
    if (!Object.keys(handleShop).includes(args[0])) return Bot.errormsg(msg, `The valid shop names are:
${codestr(Object.keys(handleShop).join(", "), "yaml")}`, "Invalid Shop Name!!");

    const user = Database.getUser(msg.author.id);

    let page = constrain(num || 1, 1, Infinity);
    let data = handleShop[args[0]](user);

    Bot.carousel(msg, data, 5, (page, i): Discord.MessageEmbedOptions => ({
      color: Colors.PRIMARY,
      title: "Shop!",
      description: `View the shop! Page ${brackets(page.toString())}.
**Cycles**: ${brackets(commanum(user.cycles))}
**Text**: ${brackets(commanum(user.text))}\n${i.length > 0 ? codestr(i.join("\n\n"), "md") : codestr(`[ NO ][ MORE ][ ITEMS ]
> You've gone far enough!`, "md")}`,
      footer: { text: `Tip: Use &buy ${args[0]} to buy an item!` }
    }), page);
  }
}

export const c = new C();