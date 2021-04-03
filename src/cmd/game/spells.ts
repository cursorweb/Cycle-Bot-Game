import * as Discord from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Command, Colors, Bot, Database, brackets } from "../../global";

class C extends Command {
  names = ["spells", "use-spell", "spell"];
  help = "Look at all the spells or use a spell!";
  examples = ["spells 3", "use-spell Coinflip"];

  get cooldown() {
    return 1000;
  }

  exec(msg: Discord.Message, _: string[]) {
    msg.channel.send("soon!");
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `You are still tired from the last spell you cast!
Please wait ${brackets((ms / 1000).toFixed(1))} seconds before you can cast again.`, "Too tired!");
  }
}

export const c = new C();