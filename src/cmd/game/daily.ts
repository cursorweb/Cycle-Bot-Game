import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Database, Bot, formatDate, msBetween, brackets, commanum, addMs, randomChoice } from "../../global.js";
import { ItemEnum } from "../../util/data/item.js";

const rewards: ((user: Database.CycleUser) => Discord.EmbedFieldData)[] = [
  user => {
    let amt = new Big(user.inv[ItemEnum.DailyChest] || 0);
    amt = amt.plus(2);
    user.inv[ItemEnum.DailyChest] = amt.toString();

    return {
      name: "Daily reward!",
      value: `You got a special ${brackets("Daily Chest")} **x2**!`
    };
  },
  user => {
    let cycles = new Big(user.cycles);
    const amt = new Big(user.cpp).times(20);

    cycles = cycles.plus(amt);
    user.cycles = cycles.toString();

    return {
      name: "Daily post!",
      value: `You got ${brackets(commanum(amt.toString()))} cycles!
You now have ${brackets(commanum(cycles.toString()))} cycles!`
    };
  },
  user => {
    let text = new Big(user.text);
    const amt = new Big(user.tpc).times(22);

    text = text.plus(amt);
    user.text = text.toString();

    return {
      name: "Instant code!",
      value: `You got ${brackets(commanum(amt.toString()))} text!
You now have ${brackets(commanum(text.toString()))} text!`
    };
  }
];

class C extends Command {
  names = ["daily", "d"];
  help = "Claim your daily award!";
  isGame = "y" as const;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);

    if (msBetween(new Date(), new Date(user.daily)) > 0) return Bot.errormsg(msg, `You still need to wait ${formatDate(msBetween(new Date(), new Date(user.daily)))}`, "Daily Cooldown!");

    const func = randomChoice(rewards)[0];
    const out = func(user);

    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Daily Reward!",
        description: "You got your daily reward!",
        fields: [out],
        footer: { text: "Come back tomorrow for a daily reward!" }
      }]
    });

    user.daily = addMs(new Date(), 60e3 * 60 * 10).toString();
  }
}

export const c = new C();