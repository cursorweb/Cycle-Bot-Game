import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database, Bot, formatDate, msBetween, brackets, commanum, addMs, randomChoice } from "../../global";

let rewards: ((user: Database.CycleUser) => Discord.EmbedFieldData)[] = [
  user => {
    let amt = new Big(user.inv[5] || 0);
    amt = amt.plus(1);
    user.inv[5] = amt.toString();

    return {
      name: "Daily reward!",
      value: `You got a special ${brackets("Daily Chest")} **x2**!`
    };
  },
  user => {
    let cycles = new Big(user.cycles);
    let amt = new Big(user.cpp).times(20);

    user.cycles = cycles.plus(amt).toString();

    return {
      name: "Daily reward!",
      value: `You got ${brackets(commanum(amt.toString()))} cycles!
You now have ${brackets(commanum(cycles.toString()))} cycles!`
    }
  }
];

class C extends Command {
  names = ["daily", "d"];
  help = "Claim your daily award!";
  isGame = 'y' as 'y';

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);

    if (msBetween(new Date(), new Date(user.daily)) > 0) return Bot.errormsg(msg, `You still need to wait ${formatDate(msBetween(new Date(), new Date(user.daily)))}`, "Daily Cooldown!");
    
    let func = randomChoice(rewards)[0];
    let out = func(user);

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Daily Reward!",
        description: `You got your daily reward!`,
        fields: [out],
        footer: { text: "Come back tomorrow for a daily reward!" }
      }
    });

    // user.daily = addMs(new Date(), 60e3 * 60 * 10).toString();
  }
}

export const c = new C();