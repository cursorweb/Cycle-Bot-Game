import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["buy", "b"];
  help = "Buy an item from the shop!";
  examples = ['buy idle "cookie cutter"', 'buy idle "cookie cutter" 50'];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    
  }
}

export const c = new C();