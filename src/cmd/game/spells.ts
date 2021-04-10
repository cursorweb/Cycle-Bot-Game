/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from "discord.js";
import { Command, Colors, Bot, Database, brackets } from "../../global";
import { spells } from "../../util/data/boosts";

class C extends Command {
  names = ["spells", "use-spell", "spell"];
  help = "Look at all the spells or use a spell!";
  examples = ["spells 3", "use-spell Coinflip"];

  get cooldown() {
    return 1000;
  }

  exec(msg: Discord.Message, args: string[]) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);
    if (args.length == 1) {
      let name = args[0];
    } else {
      // show all avail
    }
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `You are still tired from the last spell you cast!
Please wait ${brackets((ms / 1000).toFixed(1))} seconds before you can cast again.`, "Too tired!");
  }
}

export const c = new C();