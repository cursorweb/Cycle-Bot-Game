import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Version 0.0.3",
        description: "Firebase is set up, and the wiki is mostly finished. Now it is just the problem of making things *work*. See you tomorrow!"
      }
    });
  }
}

export const c = new C();