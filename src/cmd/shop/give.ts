/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["give", "g"];
  help = "Give someone an item!";
  examples = ["give @Coder100 apple"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("Coming... SOON!");
  }
}

export const c = new C();