import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, brackets, plural, commanum, Database } from "../../global";
import { code as drops } from "../../util/data/drops";

class C extends Command {
  names = ["code", "c"];
  help = "Work on your project!";
  isGame = 'y' as 'y';

  get cooldown() { return 5000; }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    let user = Database.getUser(msg.author.id);
    let tpc = new Big(user.tpc), text = new Big(user.text);

    let isServer = msg.guild!.id == "788421241005408268"; // if user is in official server

    if (isServer) tpc = tpc.times(1.1).dp(0);

    let fields: Discord.EmbedFieldData[] = [];
    for (const drop of drops) {
      if (drop.chance()) {
        fields.push(drop.award(user));
        tpc = new Big(user.tpc), text = new Big(user.text); // have to update it again
      }
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
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Your fingers are still tired from typing!
Please wait ${brackets((ms / 1000).toString())} seconds before you can code again.`, `Cooldown!`);
  }
}

export const c = new C();