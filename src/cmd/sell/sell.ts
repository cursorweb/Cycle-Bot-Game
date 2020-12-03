import * as Discord from "discord.js";
import { Command, Colors, Bot, plural } from "../../global";

class C extends Command {
  names = ["sell", "s"];
  help = "Sell rights to lines of code for money!";
  examples = ["sell 10"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    // todo: make the failsafe too lol
    if (args.length > 1) Bot.argserror(msg, args.length, [0, 1]);
    else msg.channel.send(`You want to sell ${args[0] || 1} line${plural(Number(args[0]) || 1)} of code. tsk tsk says the FSF
jk you can't sell code, that was weird
you can only sell... POG`);
  }
}

export const c = new C();