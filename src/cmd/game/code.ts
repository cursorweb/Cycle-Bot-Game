import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["code", "c"];
  help = "Work on your project!";

  get cooldown() { return 5000; }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    // todo: color success
    msg.channel.send("This is what coding looks like.");
  }

  cooldownError(msg: Discord.Message, ms: number) {
    msg.channel.send("You are still tired from typing! You have " + ms / 1000 + "seconds LEFT");
  }
}

export const c = new C();