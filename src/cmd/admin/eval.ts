import * as Discord from "discord.js";
import * as g from "../../global";

class C extends g.Command {
  names = ["eval"];
  help = "";

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    msg.channel.send("ok master :)")
  }
}

export default new C();