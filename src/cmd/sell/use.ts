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
    let open = openItem[itmIndex];

    if (itmIndex == -1) return Bot.errormsg(msg, `Item ${brackets(name)} not found. Check your spelling!`, "Item not found!");
    if (!user.inv[itmIndex] || user.inv[itmIndex] < amount) return Bot.errormsg(msg, `You don't have enough of this item! You still need ${amount - (user.inv[itmIndex])}`);
    if (!open) return Bot.errormsg(msg, `This kind of item can't be used!
It might be used in a shop, however.`, "Item can't be used!");
    
    let result = open(user, amount);
    if (Array.isArray(result)) Bot.errormsg(msg, result[0], result[1]);
    else {
      user.inv[itmIndex]--;
      msg.channel.send({
        embed: {
          title: "You used a ",
          color: Colors.SUCCESS,
          description: `You use **x${amount}** ${brackets(item.name)} ...`,
          fields: [result]
        }
      });
    }
  }
}

export const c = new C();