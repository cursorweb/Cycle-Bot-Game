/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from "discord.js";
import { Command, Colors } from "../../global";

class C extends Command {
  names = ["quests", "q"];
  help = "View your daily quest!";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send("Quest goes here");
  }
}

export const c = new C();