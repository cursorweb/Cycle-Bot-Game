import * as Discord from "discord.js";

import { Command, Bot, Database, Colors, random, brackets } from "../../global.js";
import { quests } from "../../util/data/quests.js";


const hours = 1000 * 60 * 60;
const names = ["easy", "medium", "hard"];

class C extends Command {
  names = ["new-quest", "newquest"];
  help = "Get a new quest! Quests cost cycles to complete, but the rewards are great!";
  examples = ["new-quest easy"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    const user = Database.getUser(msg.author.id);

    if (user.quest) {
      return Bot.errormsg(msg, `You already have a quest!
Quest is: ${brackets(quests[user.quest.name].name)}`, "Quest in progress!");
    }

    let difficulty;
    let deadline = new Date().getTime();

    switch (args[0]) {
    case "easy":
      difficulty = 0;
      deadline += hours * 24;
      break;
    case "medium":
      difficulty = 1;
      deadline += hours * 12;
      break;
    case "hard":
      difficulty = 2;
      deadline += hours * 6;
      break;
    default:
      return Bot.usererr(msg, "Valid difficulties: `hard`, `medium`, `easy`", "Invalid difficulty!");
    }

    const questi = Math.floor(random(0, quests.length));
    const quest = quests[questi];

    user.quest = {
      name: questi,
      end: new Date(deadline).toString(),
      difficulty,
      progress: 0
    };

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: `New ${names[difficulty]} quest!`,
        description: `You got ${brackets(quest.name)}!`,
        fields: [{
          name: "Description",
          value: quest.description
        }, {
          name: "Deadline",
          value: new Date(deadline).toLocaleString(),
        }]
      }]
    });
  }
}

export const c = new C();