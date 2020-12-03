import * as Discord from "discord.js";
import { Command, Colors, Database, Bot, brackets, commanum } from "../../global";

class C extends Command {
  names = ["balance", "bal"];
  help = "View your balance!\nUse profile to view your text.";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    if (!Database.getUser(msg.author.id)) return Bot.errormsg(msg, `You don't have a balance yet!
> Do \`&code\` to start playing!`, "Profile not found!");

    let user = Database.getUser(msg.author.id);

    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Personal Balance",
        description: `**Cycles**: ${brackets(commanum(user.cycles))}
**Text**: ${brackets(commanum(user.text))}`
      }
    });
  }
}

export const c = new C();