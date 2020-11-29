import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["echo", "mimic", "repeat"];
  help = "Repeats what you say";
  examples = ["echo hi"];

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send(args.join(" "));
  }
}

export const c = new C();