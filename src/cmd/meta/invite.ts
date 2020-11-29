import * as Discord from "discord.js";
import { Command } from "../../global";

class C extends Command {
  names = ["invite"];
  help = "Invite the bot to your server!";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send("(todo:format) please use &version.");
  }
}

export const c = new C();