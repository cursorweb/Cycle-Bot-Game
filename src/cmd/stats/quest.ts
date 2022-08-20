import * as Discord from "discord.js";
// import Big from "bignumber.js";
// import { quests } from "../../util/data/quests";
import { Command } from "../../global.js";
import { getUser } from "../../util/database/database.js";
// import { CycleUser } from "../../util/database/database.js";


class C extends Command {
  names = ["quests", "q", "quest"];
  help = "View your daily quest! (A work in progress)";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = getUser(msg.author.id);
    msg.channel.send(`Your quest: ${user.quest}`);
  }
}

export const c = new C();
