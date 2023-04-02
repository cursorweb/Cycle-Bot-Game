import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Database, Bot, brackets, random, pluralb, commanum, parseNumber } from "../../global.js";
import { post as drops } from "../../util/data/drops.js";
import { boosts } from "../../util/data/boosts/boosts.js";
import { levelUp } from "../../util/levels.js";
import { socialMedia } from "../../util/data/social-media.js";
import { ActionType, checkQuest } from "../../util/data/quests.js";

class C extends Command {
  names = ["post", "p"];
  help = "Post lines of code for some cycles!";
  examples = ["post 10"];
  isGame = "y" as const;

  get cooldown() {
    return 10000;
  }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);

    const user = Database.getUser(msg.author.id);
    const userBoosts = Database.Boost.getUser(msg.author.id);
    const idx = user.socialMedia;

    const levelField = levelUp(user);

    let text = new Big(user.text);
    let cycles = new Big(user.cycles);
    let cpp = new Big(user.cpp);

    const amt = new Big(parseNumber(args[0]) || user.text).decimalPlaces(0, Big.ROUND_CEIL);

    if (amt.lte(0)) return Bot.usererr(msg, `You cannot post less than ${brackets("0")} lines of code!`);
    if (text.lt(amt)) {
      return Bot.usererr(msg, `You don't have enough code!
You need ${brackets(amt.minus(text).toString())} more code.`);
    }

    // refer to desmos.
    let upvotes = amt.plus(cpp).plus(new Big(random(-0.5, 1)).times(cpp)).abs().dp(0);

    const isServer = msg.guild?.id == "788421241005408268"; // refer to ./code.ts
    if (isServer) upvotes = upvotes.times(1.05).dp(0);

    const fields: Discord.APIEmbedField[] = [];
    for (const drop of drops) {
      if (drop.chance()) {
        fields.push(drop.award(user));
        cycles = new Big(user.cycles);
        text = new Big(user.text); // have to update it again
      }
    }

    for (const index in userBoosts) {
      const itm = boosts[index];
      if (!itm.cpp) continue;
      const amt = userBoosts[index].length;
      fields.push({
        name: itm.name,
        value: itm.message || ""
      });

      cpp = cpp.times(new Big(itm.cpp).plus(100).div(100)).times(amt).dp(0);
    }

    if (idx > 0) {
      const name = socialMedia[idx];
      const prestige = Math.log(idx + 1) + 0.5;
      const cpp = new Big(user.cpp).times(prestige).dp(0);
      cycles = cycles.plus(cpp);

      fields.push({
        name: "Social Media Boost!",
        value: `With a new clout in ${name}, you get +${brackets(commanum(cpp.toString()))} more text!`
      });
    }

    if (levelField) fields.push(levelField);

    const quest = checkQuest(user, ActionType.Post);
    if (quest) fields.push(quest);

    cycles = cycles.plus(upvotes);

    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Post your Code!",
        description: `You posted ${brackets(commanum(amt.toString()))} line${pluralb(amt)} of code.
People view your post!
+ ${brackets(commanum(upvotes.toString()))} cycle${pluralb(new Big(upvotes))}!

> You now have ${brackets(commanum(cycles.toString()))} cycles!${isServer ? `
**5% cycle boost** for posting in the official discord server!` : ""}`,
        fields,
        footer: {
          text: "Use &bal to view your balance!"
        }
      }]
    });

    text = text.minus(amt);

    Database.pdb[msg.author.id].cycles = cycles.toString();
    Database.pdb[msg.author.id].text = text.toString();
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Don't spam people!
Please wait ${brackets((ms / 1000).toFixed(1))} seconds before you can post again.`, "No Spamming!");
  }
}

export const c = new C();