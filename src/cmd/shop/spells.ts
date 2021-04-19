/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from "discord.js";
import { Command, Colors, Bot, Database, brackets } from "../../global";
import { spells } from "../../util/data/boosts/spells";

class C extends Command {
  names = ["spells", "spell"];
  help = "Look at all the spells or use a spell!";
  examples = ["spells 3", "spells"];

  exec(msg: Discord.Message, args: string[]) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);
    if (args.length == 1) {
      const name = args[0];
    } else {
      // show all avail
    }
  }
}

export const c = new C();