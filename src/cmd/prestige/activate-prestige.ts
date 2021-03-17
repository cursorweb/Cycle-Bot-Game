import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database } from "../../global";
import { items, SItem } from "../../util/data/shop";

class C extends Command {
  names = ["prestige", "use-prestige", "prestige-reset"];
  help = "Reset all your data and get a boost!";

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("soon");
  }
}

export const c = new C();
