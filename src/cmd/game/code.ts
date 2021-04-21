import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, brackets, plural, commanum, Database } from "../../global";
import { code as drops } from "../../util/data/drops";
import { boosts } from "../../util/data/boosts/boosts";

class C extends Command {
  names = ["code", "c"];
  help = "Work on your project!";
  isGame = "y" as const;

  get cooldown() {
    return 5000;
  }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);
    const userBoosts = Database.Boost.getUser(msg.author.id);
    let tpc = new Big(user.tpc), text = new Big(user.text), xp = new Big(user.xp);
    const level = new Big(user.level);

    const isServer = msg.guild?.id == "788421241005408268"; // if user is in official server

    const fields: Discord.EmbedFieldData[] = [];
    xp = xp.plus(1);
    if (xp.gte(level.pow(2))) {
      // level up!
      xp = new Big(0);
      user.level = level.plus(1).toString();

      const newCpp = new Big(user.cpp).times(1.01).dp(0);
      const newTpc = tpc = tpc.times(1.02).dp(0);
      const newCycles = new Big(user.cycles).times(1.1).dp(0);
      const newText = text = new Big(user.text).times(1.15).dp(0);

      user.cpp = newCpp.toString();
      user.tpc = newTpc.toString();
      user.cycles = newCycles.toString();
      user.text = newText.toString();

      fields.push({
        name: "Level up!",
        value: `You are now level ${brackets(commanum(user.level))}!`
      });
    }

    if (isServer) tpc = tpc.times(1.1).dp(0);
    for (const drop of drops) {
      if (drop.chance()) {
        fields.push(drop.award(user));
        tpc = new Big(user.tpc), text = new Big(user.text); // have to update it again
      }
    }

    for (const index in userBoosts) {
      const itm = boosts[index];
      if (!itm.tpc) continue;
      const amt = userBoosts[index].length;
      fields.push({
        name: itm.name,
        value: itm.message || ""
      });

      tpc = tpc.times(new Big(itm.tpc).plus(100).div(100)).times(amt).dp(0);
    }

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Code Code Code!",
        description: `You code your heart out!
You make ${brackets(commanum(tpc.toString()))} line${plural(tpc.toNumber())} of code!${isServer ? `
**10% text boost** for coding in the official discord server!` : ""}`,
        footer: { text: "Use &post to get some cycles!" },
        fields
      }
    });

    user.text = text.plus(tpc).toString();
    user.xp = xp.toString();
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Your fingers are still tired from typing!
Please wait ${brackets((ms / 1000).toString())} seconds before you can code again.`, "Cooldown!");
  }
}

export const c = new C();