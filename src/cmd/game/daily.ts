import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["daily", "d"];
  help = "Claim your daily award!";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send("BRO YOU ARE SUCH AA BULLY I DON'T HAVE A WORKIGN DATABASE YET");
  }
}

export const c = new C();