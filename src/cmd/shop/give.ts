import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["give", "g"];
  help = "Give someone an item!";
  examples = ["give @Coder100 apple"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    
  }
}

export const c = new C();