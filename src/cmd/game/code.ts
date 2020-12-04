import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, brackets, plural, commanum, Database } from "../../global";

class C extends Command {
  names = ["code", "c"];
  help = "Work on your project!";
  isGame = 'y' as 'y';

  get cooldown() { return 5000; }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    let user = Database.getUser(msg.author.id);
    let tpc = new Big(user.tpc), text = new Big(user.text);

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Code Code Code!",
        description: `You code your heart out!
You make ${brackets(commanum(user.tpc))} line${plural(tpc.toNumber())} of code!`,
        footer: {
          text: "Use &post to get some cycles!"
        }
      }
    });

    user.text = text.plus(tpc).toString();
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Your fingers are still tired from typing!
Please wait ${brackets((ms / 1000).toString())} seconds before you can code again.`, `Cooldown!`);
  }
}

export const c = new C();