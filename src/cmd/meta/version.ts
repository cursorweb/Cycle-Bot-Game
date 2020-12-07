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
        title: "Version 0.0.5",
        description: "The bot is now on repl.it discord, and its time for the *second* half to the road to v1!"
      }
    });
  }
}

export const c = new C();