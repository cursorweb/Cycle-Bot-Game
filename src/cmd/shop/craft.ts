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
    msg.channel.send("soon! Working on adding craft data.");
  }
}

export const c = new C();