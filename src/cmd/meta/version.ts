import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Version 0.0.2",
        description: "The bot now responds to the essential commands as the older commands get polished! See you tomorrow in a better version!"
      }
    });
  }
}

export const c = new C();