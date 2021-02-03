import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, brackets } from "../../global";
import { items } from "../../util/data/item";
import { openItem } from "../../util/data/openItem";

class C extends Command {
  names = ["use", "eat", "u"];
  help = "Use an item!";
  examples = ["use apple"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    let name = args[0];
    let amount = 1;
    let user = Database.getUser(msg.author.id);

    let itmIndex = items.findIndex(o => o.name.toLowerCase() == name.toLowerCase());
    if (itmIndex == -1) itmIndex = items.findIndex(i => i.name.toLowerCase().indexOf(name.toLowerCase()) > -1);

    let item = items[itmIndex];

    if (itmIndex == -1) return Bot.errormsg(msg, `Item ${brackets(name)} not found. Check your spelling!`, "Item not found!");
    if (!user.inv[itmIndex] || user.inv[itmIndex] < amount) return Bot.errormsg(msg, `You don't have enough of this item! You still need ${amount - (user.inv[itmIndex])}`);

    let result = openItem[itmIndex](user, amount);
    if (Array.isArray(result)) Bot.errormsg(msg, result[0], result[1]);
    else {
      user.inv[itmIndex]--;
      msg.channel.send({
        embed: {
          title: "Transaction Successful!",
          color: Colors.SUCCESS,
          description: `You use **x1** ${brackets(item.name)} ...`,
          fields: [result]
        }
      });
    }
  }
}

export const c = new C();