import * as Discord from "discord.js";
import { Command, Colors, Bot, Database } from "../../global.js";

class C extends Command {
  names = ["admin-deploy-commands"];
  help = "Deploy the slash commands.";
  examples = ["admin-deploy-commands"];
  isGame = "n" as const;

  // don't forget to change!
  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("done!");
  }
}

export const c = new C();