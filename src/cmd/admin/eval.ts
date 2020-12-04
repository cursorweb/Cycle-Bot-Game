import * as Discord from "discord.js";
import { Command, Colors, codestr } from "../../global";

class C extends Command {
  names = ["eval"];
  help = "Evaluates code.";
  examples = ["eval 'return 1+1'"];
  isGame = 'n' as 'n';

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], client: Discord.Client) {
    try {
      let output = new Function("client", "process", args.join(" "))(client, process);
      msg.channel.send({
        embed: {
          color: Colors.SUCCESS,
          title: "Beep Boop Bop Boop!",
          description: "Output was\n" + codestr(output, "yaml")
        }
      });
    } catch (e) {
      msg.channel.send({
        embed: {
          color: Colors.ERROR,
          title: "Error!!",
          description: "Error was\n" + codestr(e, "js")
        }
      });
    }
  }
}

export const c = new C();