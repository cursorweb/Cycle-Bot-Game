import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Database} from "../../global.js";

class C extends Command {
  names = ["quests", "q"];
  help = "View your daily quest! (A work in progress)";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send("Quest goes here");
    msg.channel.send("Feel free to give ideas for unique quests with &feedback!");
    msg.channel.send("For now this is just a work in progress!");
    
    user = Database.getUser(msg.author.id);
    
    const xp = new Big(user.xp);
  }
}

export const c = new C();
