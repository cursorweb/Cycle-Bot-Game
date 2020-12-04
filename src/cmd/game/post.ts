import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database, Bot, brackets, random, pluralb, commanum } from "../../global";

class C extends Command {
  names = ["post", "p"];
  help = "Post lines of code for some cycles!";
  examples = ["post 10"];
  isGame = 'y' as 'y';

  get cooldown() { return 10000; }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) Bot.argserror(msg, args.length, [0, 1]);
    else {
      let user = Database.getUser(msg.author.id);
      let text = new Big(user.text), cpp = new Big(user.cpp), cycles = new Big(user.cycles);
      let amt = new Big(parseInt(args[0]) || user.text);

      if (amt.lte(0)) return Bot.errormsg(msg, `You cannot post less than ${brackets('0')} lines of code!`);
      if (text.lt(amt)) return Bot.errormsg(msg, `You don't have enough code!
You need ${brackets(amt.minus(text).toString())} more code.`);

      // refer to desmos.
      let upvotes = text.div(10).times(Math.sin(text.sqrt().plus(random(-5, 5)).mod(2 * Math.PI).toNumber())).plus(cpp).abs().toFixed(0);

      cycles = cycles.plus(upvotes);

      msg.channel.send({
        embed: {
          color: Colors.SUCCESS,
          title: "Post your Code!",
          description: `You posted ${brackets(commanum(amt.toString()))} line${pluralb(amt)} of code.
People viewed your post and you made ${brackets(commanum(upvotes.toString()))} cycle${pluralb(new Big(upvotes))}!

> You now have ${brackets(commanum(cycles.toString()))} cycles!`,
          footer: {
            text: "Use &bal to view your balance!"
          }
        }
      });

      text = text.minus(amt);

      Database.pdb[msg.author.id].cycles = cycles.toString();
      Database.pdb[msg.author.id].text = text.toString();
    }
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Don't spam people!
Please wait ${brackets((ms / 1000).toFixed(1))} seconds before you can post again.`, "No Spamming!");
  }
}

export const c = new C();