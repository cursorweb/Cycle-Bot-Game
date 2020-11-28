import * as Discord from "discord.js";
import * as g from "../../global";

class C extends g.Command {
  names = ["version", "some-alias"];
  help = "Get release notes of the current version!";
  examples = ["version"];

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send("[click here](https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=265280&scope=bot) to invite me! [click here](https://github.com/cursorweb/Replit-Sim) to view my github!")
  }
}

export default new C();