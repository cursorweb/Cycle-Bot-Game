import * as Discord from "discord.js";
import { Command, Colors, Bot, brackets, cleanName } from "../../global";
import admin from "../../util/admin.json";

class C extends Command {
  names = ["feedback", "bug-report"];
  help = "Report bugs or feedback on the bot!";
  examples = ["bug-report \"something didn't work\""];
  isGame = "n" as const;

  get cooldown() {
    return 60e3 * 10;
  }

  async exec(msg: Discord.Message, args: string[], client: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    for (const id of admin) {
      const user = client.users.cache.get(id);
      user?.send({
        embeds: [{
          color: Colors.PRIMARY,
          title: "Incoming Feedback!",
          description: `${brackets(cleanName(msg.author.tag))} has sent a message!`,
          fields: [{
            name: "Feedback",
            value: args[0]
          }]
        }]
      });
    }

    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Successfully sent!",
        description: "Your feedback is very important. Thanks for taking the time to write your feedback!"
      }]
    });
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `You still have ${brackets((ms / 60e3).toFixed(3))} minutes left before you can send feedback again!`, "No spamming!");
  }
}

export const c = new C();