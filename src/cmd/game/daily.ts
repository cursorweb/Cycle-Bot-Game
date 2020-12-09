import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database, Bot, formatDate, msBetween, brackets, commanum, addMs } from "../../global";

class C extends Command {
  names = ["daily", "d"];
  help = "Claim your daily award!";
  isGame = 'y' as 'y';

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);

    if (msBetween(new Date(), new Date(user.daily)) > 0) return Bot.errormsg(msg, `You still need to wait ${formatDate(msBetween(new Date(), new Date(user.daily)))}`, "Daily Cooldown!");
    
    let cycles = new Big(user.cycles).plus(100).toString();

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Daily Reward!",
        description: `You got your daily reward!
You earned ${brackets("100")} cycles!
You now have ${brackets(commanum(cycles))} cycles!`,
        footer: { text: "Come back tomorrow for a daily reward!" }
      }
    });

    user.cycles = cycles;
    user.daily = addMs(new Date(), 60e3 * 60 * 10).toString();
  }
}

export const c = new C();