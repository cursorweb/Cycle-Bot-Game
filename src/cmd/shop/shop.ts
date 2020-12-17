import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, commanum, constrain, calcPrice, brackets, codestr } from "../../global";
import { items } from "../../util/data/shop";

// [topic] [value]
const handleShop: { [i: string]: (user: Database.CycleUser) => string[] } = {
  upgrades: user => items.upgrade.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.07, user.bought.upgrades[i] || 0).toString())} Cycles ]
  <+${n.tpc!} TPC> <${commanum((user.bought.upgrades[i] || 0).toString())} owned>
  > ${n.description}`)
};

class C extends Command {
  names = ["shop"];
  help = "View the shop!";
  examples = ["shop idle", "shop idle 3"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    // if (args.length > 2 || args.length < 1) Bot.argserror(msg, args.length, [1, 2]);
    if (args[0] && isNaN(Number(args[0]))) return Bot.errormsg(msg, "The page must be a number!");

    const user = Database.getUser(msg.author.id);

    let page = constrain(Number(args[0] || 1), 1, Infinity);
    let data = items.upgrade.map((n, i) => `[ ${n.name} ][ ${commanum(calcPrice(new Big(n.cost), 1.07, user.bought.upgrades[i] || 0).toString())} Cycles ]
<+${n.tpc!} TPC> <${commanum((user.bought.upgrades[i] || 0).toString())} owned>
> ${n.description}`);

    Bot.carousel(msg, data, 5, (page, i): Discord.MessageEmbedOptions => ({
      color: Colors.PRIMARY,
      title: "Shop!",
      description: `View the shop! Page ${brackets(page.toString())}.
**Cycles**: ${brackets(commanum(user.cycles))}
**Text**: ${brackets(commanum(user.text))}\n${i.length > 0 ? codestr(i.join("\n\n"), "md") : codestr(`[ NO ][ MORE ][ ITEMS ]
> You've gone far enough!`, "md")}`,
      footer: { text: "Tip: Use &buy upgrade to buy an item!" }
    }), page);
  }
}

export const c = new C();