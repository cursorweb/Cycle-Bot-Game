import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, Database, parseMention, brackets, commanum, cleanName } from "../../global.js";
import { socialMedia } from "../../util/data/social-media.js";
import { CycleUser } from "../../util/database/database.js";

const black = "■";
const white = "□";


class C extends Command {
  names = ["profile", "prof", "bal", "balance", "stats"];
  help = "View yours or someone elses' profile.";
  examples = ["prof", "prof Coder100"];
  isGame = "p" as const;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);

    let user: CycleUser;

    if (args.length == 0) {
      user = Database.getUser(msg.author.id);
    } else {
      const userArg = parseMention(args[0]);

      if (userArg.type == "id") {
        user = Database.getUser(userArg.value);
        if (!user) return Bot.usererr(msg, `User ${brackets(`<@${userArg.value}>`)} not found.`, "User not found!");
      } else {
        const userArr = Database.findUser(u => u.name.toLowerCase().indexOf(userArg.value.toLowerCase()) > -1);
        if (userArr.length == 0) return Bot.usererr(msg, `User ${brackets(userArg.value)} not found. Check your spelling!`, "User not found!");
        else if (userArr.length > 1) {
          return Bot.errormsg(msg, `Found ${brackets(userArr.length.toString())} users.
${userArr.slice(0, 10).map(o => `${brackets(Database.getUser(o).name)}: **${o}**`).join("\n")}`, "Multiple users found!");
        }
        user = Database.getUser(userArr[0]);
      }
    }

    const sm = user.socialMedia;
    const prestige = Math.log(sm) + 0.5;

    const smBoost = [];
    if (sm > 0) {
      const nextTpc = new Big("1").times(prestige).dp(0);
      const nextCpp = new Big("1").times(prestige).dp(0);
      const nextTpm = new Big("0").plus(1).times(prestige).div(2).dp(0);

      smBoost.push({
        name: "Social Media Boosts",
        value: `Social Media: ${brackets(socialMedia[user.socialMedia])}
+ **${nextTpc}**% TPC
+ **${nextCpp}**% CPP
+ **${nextTpm}**% TPM`
      });
    }

    const xp = new Big(user.xp);
    const total = new Big(user.level).times(5);

    const percent = xp.div(total).times(10).toNumber();
    const empty = new Big(1).minus(xp.div(total)).times(10).toNumber();

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: `User ${brackets(cleanName(user.name))}`,

        description: `**Cycles**: ${commanum(user.cycles)}
**Text**: ${commanum(user.text)}`,
        fields: [{
          name: "TPC (Text Per Code)",
          value: commanum(user.tpc)
        }, {
          name: "CPP (Cycles Per Post)",
          value: commanum(user.cpp)
        }, {
          name: "TPM (Text Per Minute)",
          value: commanum(user.tpm)
        }, {
          name: "Level",
          value: `**Level**: ${commanum(user.level)}
**Progress**: [${black.repeat(percent)}${white.repeat(empty)}]`
        }].concat(smBoost)
      }]
    });
  }
}

export const c = new C();