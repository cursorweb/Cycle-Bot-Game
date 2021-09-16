import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database, brackets, codestr } from "../../global";
import { socialMedia } from "../../util/data/social-media";
import { defaultSchema } from "../../util/database/genschema";

class C extends Command {
  names = ["social-media", "media-shop"];
  help = "View the next social media planned!";
  examples = ["social-media"];

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);

    // todo: remove
    if (!user.socialMedia) {
      user.socialMedia = 0;
    }

    const idx = user.socialMedia;
    const prestige = Math.log(idx) + 0.5;

    const curr = socialMedia[idx];
    const next = socialMedia[idx + 1];

    // lnx + 0.5
    const nextTpc = new Big(defaultSchema.tpc).times(prestige);
    const nextCpp = new Big(defaultSchema.cpp).times(prestige);
    const nextTpm = new Big(defaultSchema.tpm).times(prestige);

    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Social Media",
        description: "Social medias will let you get more cycles faster, but all your clout is reset!",
        fields: [
          {
            name: "Current Social Media",
            value: `You are currently using ${brackets(curr)} to share your posts.`
          }, {
            name: "Next Social Media",
            value: `Your next social media is ${brackets(next)}.
${codestr(`+ ${nextTpc}% base TPC
+ ${nextCpp}% base CPP
+ ${nextTpm}% base TPM`)}`
          }
        ]
      }
    });
  }
}

export const c = new C();