import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["vote", "v"];
  help = "Vote for the bot <3";
  isGame = 'p' as 'p';

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Vote Link!",
        description: `**Vote rewards**: Cycles!!
**Vote Link: ** [here](https://top.gg/bot/781939317450342470/vote)`,
        footer: {
          text: "You will be DMed once your vote is processed!"
        }
      }
    });
  }
}

export const c = new C();