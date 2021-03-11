import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, brackets } from "../../global";
import { items } from "../../util/data/item";
import { craftItems } from "../../util/data/craft";

class C extends Command {
  names = ["craft", "create"];
  help = "Create an item... from other items!";
  examples = ["create 'chest chest chest' 5"];

  isAdmin = true;

  exec(msg: Discord.Message, args: string[]) {
    if (args.length > 3) return Bot.argserror(msg, args.length, [0, 1, 2]);
    if (args.length == 0) {
      let fields = craftItems.map(p => {
        let uses = p.requires.map(n => `${items[n.type].name} x${brackets(n.amt.toString())}`);
        return {
          make: items[p.creates].name + "\n".repeat(uses.length - 1),
          uses: uses.join("\n"),
        }
      });
      Bot.carousel(msg, fields, 3, (page, i) => {
        return {
          color: Colors.PRIMARY,
          title: "Crafting Items",
          description: `These are all the available crafting items! Page ${brackets(page.toString())}`,
          fields: i.length == 0 ? [{
            name: "Empty Page",
            value: "No items here!"
          }] : [{
            name: "Item",
            value: i.map(n => n.make).join("\n\n"),
            inline: true
          }, {
            name: "Ingredients",
            value: i.map(n => n.uses).join("\n\n"),
            inline: true
          }],
          footer: { text: "Tip: type in the item name to craft it!" }
        }
      });
    } else {

    }
  }
}

export const c = new C();