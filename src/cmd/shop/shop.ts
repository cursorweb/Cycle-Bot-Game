import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["shop"];
  help = "View the shop!";
  examples = ["shop idle", "shop idle 3"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    
  }
}

export const c = new C();