import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, Database, brackets, parseNumber, commanum, codestr, noun } from "../../global.js";
import { items } from "../../util/data/item.js";
import { craftItems } from "../../util/data/craft.js";

class C extends Command {
  names = ["craft", "create"];
  help = "Create an item... from other items!";
  examples = ["create 'chest chest chest' 5"];

  exec(msg: Discord.Message, args: string[]) {
    if (args.length > 3) return Bot.argserror(msg, args.length, [0, 1, 2]);
    const num = parseNumber(args[0] || "0");
    if (args.length == 0 || num) {
      const fields = craftItems.map(p => {
        const uses = p.requires.map(n => `[ ${items[n.type].name} ][ x${n.amt} ]`);
        return `${noun(items[p.creates].name)}
${codestr(uses.join("\n"), "md")}`;
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
            value: i.join("\n\n"),
            inline: true
          }],
          footer: { text: "Tip: Use &craft <item> to craft <item>!" }
        };
      }, num || 1);
    } else {
      const itmInput = args[0];
      const amt = parseNumber(args[1] || "1");
      if (isNaN(amt)) return Bot.usererr(msg, "The amount must be a number!");

      // find item
      let item = craftItems.find(o => items[o.creates].name.toLowerCase() == itmInput.toLowerCase());
      if (!item) item = craftItems.find(o => items[o.creates].name.toLowerCase().indexOf(itmInput.toLowerCase()) > -1);
      if (!item) {
        return Bot.usererr(msg, `Item ${brackets(itmInput)} not found.
      Check your spelling!`, "Item not found!");
      }

      // alias
      const itemMeta = items[item.creates];

      // check availability
      const user = Database.getUser(msg.author.id);
      for (const itm of item.requires) {
        const num = new Big(itm.amt).times(amt);
        const userAmt = new Big(user.inv[itm.type] || 0);
        if (userAmt.lt(num)) {
          return Bot.errormsg(msg, `You don't have enough of ${brackets(items[itm.type].name)}!
**You still need** ${brackets(commanum(num.minus(userAmt).toString()))} **more!**`);
        }
      }

      for (const itm of item.requires) {
        const num = new Big(itm.amt).times(amt);
        const userAmt = new Big(user.inv[itm.type] || 0);
        user.inv[itm.type] = userAmt.minus(num).toString();
      }

      let outAmt = new Big(user.inv[item.creates] || 0);
      outAmt = outAmt.plus(amt);
      user.inv[item.creates] = outAmt.toString();

      msg.channel.send({
        embeds: [{
          color: Colors.PRIMARY,
          title: "Success!",
          description: item.message,
          fields: [{
            name: "Result",
            value: `+ ${brackets(commanum(amt.toString()))} ${itemMeta.name}!`
          }]
        }]
      });
    }
  }
}

export const c = new C();