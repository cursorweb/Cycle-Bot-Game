import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["use", "eat", "u"];
  help = "Use an item!";
  examples = ["use apple"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("coming very later.");
  }
}

export const c = new C();