import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";
  isGame = "n" as const;

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Version 0.1.8",
        description: "The shop now has many new items, and prices are on sale!! Also, new inventory items have been added.",
        fields: [{
          name: "Discord Server",
          value: "Talk to the developers, and get sneak peeks in the official [discord server](https://discord.gg/4vTPWdpjFz)!"
        }]
      }
    });
  }
}

export const c = new C();