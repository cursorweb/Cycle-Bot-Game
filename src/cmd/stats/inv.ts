import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["inventory", "inv", "i"];
  help = "View your inventory.";
  examples = ["i 2"];

  get cooldown() { return 5; }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("You don't have any items (yet), and btw, here's the data:\n" + args.join(","));
  }
}

export const c = new C();