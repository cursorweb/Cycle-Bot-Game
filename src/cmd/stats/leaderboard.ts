import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["leaderboard", "scoreboard", "lb", "l"];
  help = "Get the leaderboard!";
  examples = ["lb 5", "lb"];
  isGame = 'n' as 'n';

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) msg.channel.send("Too many args!");
    if (args.length == 1) msg.channel.send("your wanted to visit page\n" + args[0]);
    else msg.channel.send("you wanted to visit the first page.");
  }
}

export const c = new C();