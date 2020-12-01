import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["convert", "currency"];
  help = "Convert your currencies";
  examples = ["convert <type> <target> <amt>?"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("Welcome to currency exchange!\nparsed args: " + args.join(","));
  }
}

export const c = new C();