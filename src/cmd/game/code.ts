import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, brackets, plural, commanum, Database } from "../../global.js";
import { code as drops } from "../../util/data/drops.js";
import { boosts } from "../../util/data/boosts/boosts.js";
import { levelUp } from "../../util/levels.js";
import { socialMedia } from "../../util/data/social-media.js";
import { ActionType, checkQuest } from "../../util/data/quests.js";

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
    const idx = user.socialMedia;

    const fields: Discord.APIEmbedField[] = [];
    const levelField = levelUp(user);
    if (levelField) fields.push(levelField);

    let tpc = new Big(user.tpc);
    let text = new Big(user.text);

    const isServer = msg.guild?.id == "788421241005408268"; // if user is in official server

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

    if (idx > 0) {
      const name = socialMedia[idx];
      const prestige = Math.log(idx + 1) + 0.5;
      const tpc = new Big(user.tpc).times(prestige).dp(0);
      text = text.plus(tpc);

      fields.push({
        name: "Social Media Boost!",
        value: `With a better code editor in ${name},\nyou get +${brackets(commanum(tpc.toString()))} more text!`
      });
    }

    const quest = checkQuest(user, ActionType.Code);
    if (quest) fields.push(quest);

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Code Code Code!",
        description: `You code your heart out!
You make ${brackets(commanum(tpc.toString()))} line${plural(tpc.toNumber())} of code!${isServer ? `
**10% text boost** for coding in the official discord server!` : ""}`,
        footer: { text: "Use &post to get some cycles!\nUse &open 'chest chest' to open chests!" },
        fields
      }]
    });

    user.text = text.plus(tpc).toString();
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Your fingers are still tired from typing!
Please wait ${brackets((ms / 1000).toString())} seconds before you can code again.`, "Cooldown!");
  }
}

export const c = new C();