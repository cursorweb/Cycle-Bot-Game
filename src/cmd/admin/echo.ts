import * as Discord from "discord.js";
import { Command } from "../../global.js";

class C extends Command {
  names = ["echo", "mimic", "repeat"];
  help = "Repeats what you say";
  examples = ["echo hi"];
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send(args.join(" "));
  }
}

export const c = new C();