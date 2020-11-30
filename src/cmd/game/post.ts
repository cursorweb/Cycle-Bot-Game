import * as Discord from "discord.js";
import { Command, Colors, Bot, brackets } from "../../global";

class C extends Command {
  names = ["post", "p"];
  help = "Post lines of code for some cycles!";
  examples = ["post 10"];

  get cooldown() { return 10000; }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) Bot.argserror(msg, args.length, [0, 1]);
    else msg.channel.send("you are going to post " + (args[0] || 1) + " lines of code (sorry)");
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Don't spam people!
Please wait ${brackets((ms / 1000).toFixed(1))} seconds before you can post again.`, "No Spamming!");
  }
}

export const c = new C();