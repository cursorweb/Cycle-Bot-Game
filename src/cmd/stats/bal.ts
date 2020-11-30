import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["balance", "bal"];
  help = "View your balance!\nUse profile to view your text.";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send("It will tell you how much you have in *each* of the three currencies.");
  }
}

export const c = new C();