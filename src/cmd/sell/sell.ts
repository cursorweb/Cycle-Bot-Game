import * as Discord from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Command, Colors, Bot, plural } from "../../global";

class C extends Command {
  names = ["sell", "s"];
  help = "Sell rights to lines of code for money!";
  examples = ["sell 10"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    // todo: make the failsafe too lol
    if (args.length > 1) Bot.argserror(msg, args.length, [0, 1]);
    else msg.channel.send("sell items only");
  }
}

export const c = new C();