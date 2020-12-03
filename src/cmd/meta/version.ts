import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Version 0.0.35",
        description: "Finally. The one thing we have all been waiting for! `&code` now partially works! Code away and see you tommorrow!"
      }
    });
  }
}

export const c = new C();