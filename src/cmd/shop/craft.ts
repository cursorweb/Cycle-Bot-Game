import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database } from "../../global";
import { CraftItem } from "../../util/data/craft";

class C extends Command {
  names = ["craft", "create"];
  help = "Create an item... from other items!";
  examples = ["create ego-block"];

  isAdmin = true;

  exec(msg: Discord.Message, args: string[]) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);
    if (args.length == 0) {
      
    } else {

    }
  }
}

export const c = new C();