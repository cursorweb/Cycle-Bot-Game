import * as Discord from "discord.js";
import { Command, Colors } from "../../global.js";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";
  isGame = "n" as const;

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Version 0.1.19",
        description: "Quests update! Invest a certain amount of cycles and get a big payback! Get one now -> `&new-quest`",
        fields: [{
          name: "Discord Server",
          value: "Talk to the developers, and get sneak peeks in the official [discord server](https://discord.gg/4vTPWdpjFz)!"
        }]
      }]
    });
  }
}

export const c = new C();