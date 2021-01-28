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
        title: "Version 0.0.95",
        description: "You can now finally use the items you got to get text every minute!! Yay!",
        fields: [{
          name: "Discord Server",
          value: "Talk to the developers, and get sneak peeks in the official [discord server](https://discord.gg/4vTPWdpjFz)!"
        }]
      }
    });
  }
}

export const c = new C();