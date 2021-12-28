import * as Discord from "discord.js";
import { Command, Colors, Bot, brackets } from "../../global";
import { items } from "../../util/data/item";
import { openItem } from "../../util/data/open-item";

class C extends Command {
  names = ["info", "item"];
  help = "Get info about an item!";
  examples = ["info coffee"];

  isGame = "n" as const;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);
    const name = args[0];
    let itemIndex = items.findIndex(n => n.name.toLowerCase() == name.toLowerCase());
    if (itemIndex == -1) itemIndex = items.findIndex(n => n.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    if (itemIndex == -1) {
      return Bot.usererr(msg, `The item ${brackets(name)} was not found!
Check your spelling!`, "Item not found!");
    }

    const item = items[itemIndex];
    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Item Info",
        description: `*${item.description}*`,
        fields: [{
          name: "Stats",
          value: `**Drop Chance: ** ${item.dropChance}%
**Openable? ** ${openItem[itemIndex] ? "yes" : "no"}`
        }]
      }]
    });
  }
}

export const c = new C();