import * as Discord from "discord.js";
import { Command } from "../../global";

class C extends Command {
  names = ["eval"];
  help = "Evaluates code.";
  examples = ["eval 1+1"];

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], client: Discord.Client) {
    let output = new Function("client", "process", args.join(" "))(client, process);
    msg.channel.send("output was `"+output+"`");
  }
}

export const c = new C();