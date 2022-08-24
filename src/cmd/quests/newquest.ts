import * as Discord from "discord.js";
import { Command, Bot } from "../../global.js";

class C extends Command {
  names = ["new-quest", "newquest"];
  help = "Get a new quest!";
  examples = ["new-quest easy"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    switch (args[1]) {
    case "easy":
      break;
    case "medium":
      break;
    case "hard":
      break;
    }
  }
}

export const c = new C();