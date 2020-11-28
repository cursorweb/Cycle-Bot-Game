import * as Discord from "discord.js";
import * as g from "../../global";

class C extends g.Command {
  names = ["invite"];
  help = "";

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    
  }
}

export default new C();