import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";
  isGame = 'n' as 'n';

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Version 0.0.65",
        description: "I moved the database onto firebase, and also you can expect more stability!"
      }
    });
  }
}

export const c = new C();