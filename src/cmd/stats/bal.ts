import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database, brackets, commanum } from "../../global";

class C extends Command {
  names = ["balance", "bal"];
  help = "View your balance!\nUse profile to view your text.";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);

    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Personal Balance",
        description: `**Cycles**: ${brackets(commanum(user.cycles))}
**Text**: ${brackets(commanum(user.text))}
**Level**: ${brackets(commanum(user.level))} (${commanum(user.xp)} / ${commanum(new Big(user.level).pow(2).toString())} xp)`
      }
    });
  }
}

export const c = new C();