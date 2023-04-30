import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, Database, commanum, constrain, calcPrice, brackets, codestr, parseNumber } from "../../global.js";
import { items } from "../../util/data/shop.js";
import { boostShop } from "../../util/data/boosts/boosts-shop.js";
import { boosts } from "../../util/data/boosts/boosts.js";
import { ItemEnum } from "../../util/data/item.js";

// [topic] [value]
const handleShop: { [i: string]: (user: Database.CycleUser) => string[] } = {
  text: user => items.upgrades.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.07, user.bought.upgrades[i] || 0).toString())} Cycles ]
<+${n.tpc} TPC> <${commanum((user.bought.upgrades[i] || 0).toString())} owned>
> ${n.description}`),
  post: user => items.cpp.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.14, user.bought.cpp[i] || 0).toString())} Cycles ]
<+${n.cpp} CPP> <${commanum((user.bought.cpp[i] || 0).toString())} owned>
> ${n.description}`),
  idle: user => items.idle.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.21, user.bought.idle[i] || 0).toString())} Idle-Coins ]
<+${n.tpm} TPM> <${commanum((user.bought.idle[i] || 0).toString())} owned>
> ${n.description}`),
  boosts: _ => boostShop.map(n => {
    const b = boosts[n.ref];
    return `[ ${b.name} ][ ${n.cost} Golden Cycles ]
<+${b.tpc || 0}% TPC> <+ ${b.cpp || 0}% CPP> <+ ${b.tpm || 0}% TPM>
> ${b.description}`;
  })
};

class C extends Command {
  names = ["shop"];
  help = "View the shop!";
  examples = ["shop idle", "shop idle 3"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length == 0) {
      return Bot.errormsg(msg, `The valid shop names are:
    ${codestr(Object.keys(handleShop).join(", "), "yaml")}`, "Shop names");
    }
    if (args.length != 1 && args.length != 2) return Bot.argserror(msg, args.length, [1, 2]);
    const num = parseNumber(args[1]);
    if (args[1] && isNaN(num)) return Bot.usererr(msg, "The page must be a number!");
    if (!Object.keys(handleShop).includes(args[0])) {
      return Bot.errormsg(msg, `The valid shop names are:
${codestr(Object.keys(handleShop).join(", "), "yaml")}`, "Invalid Shop Name!!");
    }

    const user = Database.getUser(msg.author.id);

    const page = constrain(num || 1, 1, Infinity);
    const data = handleShop[args[0]](user);

    Bot.carousel(msg, data, 5, (page, i): Discord.APIEmbed => ({
      color: Colors.PRIMARY,
      title: "Shop!",
      description: `View the shop! Page ${brackets(page.toString())}.
**Cycles**: ${brackets(commanum(user.cycles))}
**Text**: ${brackets(commanum(user.text))}
**Idle-Coins**: ${brackets(commanum(user.inv[ItemEnum.IdleCoin] || "0"))}
**Golden Cycles**: ${brackets(commanum(user.inv[ItemEnum.GoldenCycle] || "0"))}
${i.length > 0 ? codestr(i.join("\n\n"), "md") : codestr(`[ NO ][ MORE ][ ITEMS ]
> You've gone far enough!`, "md")}`,
      footer: { text: `Tip: Use &buy ${args[0]} to buy an item!` }
    }), page);
  }
}

export const c = new C();