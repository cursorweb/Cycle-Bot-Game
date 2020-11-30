import * as Discord from "discord.js";
import { Command, Colors, Bot } from "../../global";

class C extends Command {
  names = ["profile", "prof"];
  help = "View yours or someone elses' profile.";
  examples = ["prof", "prof Coder100"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) Bot.argserror(msg, args.length, [0, 1]);
    else msg.channel.send("<insert profile here>\nNOT DONE YET\nbtw some info: " + args[0]);
  }
}

export const c = new C();