import * as Discord from "discord.js";
import { Command, Colors, Bot, brackets } from "../../global";

class C extends Command {
  names = ["code", "c"];
  help = "Work on your project!";

  get cooldown() { return 5000; }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    // todo: color success
    msg.channel.send("This is what coding looks like.");
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `Your fingers are still tired from typing!
Please wait ${brackets((ms / 1000).toString())} seconds before you can code again.`, `Cooldown!`);
  }
}

export const c = new C();