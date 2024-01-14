import * as Discord from "discord.js";
import Big from "bignumber.js";

import { CycleUser } from "../../../util/database/genschema.js";
import { Command, Bot, Database, Colors, random, brackets, formatDate, commanum, codestr } from "../../../global.js";
import { quests, qDiff, checkQuest } from "../../../util/data/quests.js";


const hours = 1000 * 60 * 60;

class C extends Command {
  names = ["new-quest", "newquest"];
  help = "Get a new quest! Quests cost cycles to complete, but the rewards are great!";
  examples = ["new-quest easy"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length == 0) {
      msg.channel.send({
        embeds: [{
          color: Colors.PRIMARY,
          title: "Quests!",
          description: `Use \`&new-quest <difficulty>\` to make a new quest!\nThe difficulties are:\n${codestr(`
&new-quest Easy
&new-quest Medium
&new-quest Hard`, "yaml")}`
        }]
      });
      return;
    }
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    const user = Database.getUser(msg.author.id);

    checkQuest(user);

    if (user.quest) {
      return Bot.errormsg(msg, `You already have a quest!
Quest is: ${brackets(quests[user.quest.name].name)}`, "Quest in progress!");
    }

    let difficulty: 0 | 1 | 2;
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

    const cost = this.checkCycles(msg, user, difficulty);
    if (cost == 0) {
      return;
    }

    const questi = Math.floor(random(1, quests.length));
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
        title: `New ${qDiff[difficulty]} quest!`,
        description: `You got ${brackets(quest.name)}!
\\- ${brackets(cost.toString())} cycles`,
        fields: [{
          name: "Description",
          value: quest.description
        }, {
          name: "Deadline",
          value: formatDate(new Date(deadline).getTime() - new Date().getTime()),
        }]
      }]
    });
  }

  private checkCycles(msg: Discord.Message, user: CycleUser, diff: 0 | 1 | 2) {
    const userCycles = new Big(user.cycles);
    const handle = (amt: number) => {
      if (userCycles.lt(new Big(amt))) {
        Bot.errormsg(msg, `Not enough cycles!!
    You need ${brackets(commanum(new Big(amt).minus(userCycles).toString()))} more cycles.`);
        return false;
      }

      user.cycles = userCycles.minus(amt).toString();
      return amt;
    };

    switch (diff) {
      case 0: return handle(1_000);
      case 1: return handle(100_000);
      case 2: return handle(1_000_000);
    }
  }
}

export const c = new C();