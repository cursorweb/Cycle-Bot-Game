import * as Discord from "discord.js";
import { Command } from "../../global";

class C extends Command {
  names = ["version", "announcements"];
  help = "Get release notes of the current version!";

  exec(msg: Discord.Message, _1: string[], _2: Discord.Client) {
    msg.channel.send("(todo:format) There are no release notes yet as the bot is in alpha.");
  }
}

export const c = new C();