import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, brackets, plural, pluralb, commanum, Database } from "../../global";

let drops: { chance: () => boolean, award: (_: Database.CycleUser) => Discord.EmbedFieldData }[] = [{
  chance: () => Math.random() < 0.1,
  award: user => {
    let text = new Big(user.text);
    let tpc = new Big(user.tpc);
    let boost = Math.floor(Math.random() * 5 + 1);
    let amount = tpc.times(boost).dp(0);
    text = text.plus(amount);
    user.cycles = text.toString();
    return { name: "Code Burst!", value: `With a burst of energy, you made an extra ${brackets(commanum(amount.toString()))} cycle${pluralb(amount)}! (+${boost * 100}%)` }
  }
}];

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
      if (drop.chance()) fields.push(drop.award(user));
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