import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Database, brackets, codestr, commanum } from "../../../global.js";
import { socialMedia } from "../../../util/data/social-media.js";

class C extends Command {
  names = ["social-media", "media-shop", "sm"];
  help = "View the next social media planned!";
  examples = ["social-media"];

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);

    // todo: remove
    if (!user.socialMedia) {
      user.socialMedia = 0;
    }

    const idx = user.socialMedia;
    const prestige = Math.log(idx + 1) + 0.5;

    const curr = socialMedia[idx];
    const next = socialMedia[idx + 1];

    // lnx + 0.5
    const nextTpc = new Big("1").times(prestige).dp(0);
    const nextCpp = new Big("1").times(prestige).dp(0);
    const nextTpm = new Big("0").plus(1).times(prestige).div(2).dp(0);

    const cyclesNeeded = new Big(100_000).pow(Math.ceil(Math.log(2 * (idx + 1))));

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Social Media",
        description: "Social medias will let you get more cycles faster,\nbut all your clout is reset!",
        fields: [
          {
            name: "Current Social Media",
            value: `You are currently using ${brackets(curr)} to share your posts.`
          }, {
            name: "Next Social Media",
            value: `Your next social media is ${brackets(next)}.
${codestr(`+ ${nextTpc}% base TPC
+ ${nextCpp}% base CPP
+ ${nextTpm}% base TPM`)}

**Requirement: ** ${commanum(cyclesNeeded.toString())} cycles!`
          }
        ],
        footer: {
          text: "Use &next-media to go to the next social media!"
        }
      }]
    });
  }
}

export const c = new C();