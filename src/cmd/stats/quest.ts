import { quests } from "../../util/data/quests.js"
import * as Discord from "discord.js";
import { Command } from "../../global.js";

class C extends Command {
  names = ["quests", "q"];
  help = "View your daily quest!";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);
    msg.channel.send("Quest goes here");
    msg.channel.send("Feel free to give ideas for unique quests with &feedback!");
    msg.channel.send("For now this is just a work in progress!");
  }
}

export const c = new C();
