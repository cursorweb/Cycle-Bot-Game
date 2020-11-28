import * as Discord from "discord.js";
import * as g from "../../global";

class C extends g.Command {
  names = ["echo", "mimick", "repeat"];
  help = "Repeat what I say";
  examples: string[] = ["echo hi"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send(args.join(" "));
  }
}

export default new C();