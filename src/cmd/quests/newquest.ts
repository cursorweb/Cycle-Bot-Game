import * as Discord from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Command, Bot, Database, Colors, randomChoice } from "../../global.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { quests } from "../../util/data/quests.js";

class C extends Command {
  names = ["new-quest", "newquest"];
  help = "Get a new quest!";
  examples = ["new-quest easy"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    // const user = Database.getUser(msg.author.id);
    let difficulty;

    switch (args[1]) {
    case "easy":
      difficulty = "easy";
      break;
    case "medium":
      difficulty = "medium";
      break;
    case "hard":
      difficulty = "hard";
      break;
    default:
      return Bot.usererr(msg, "Valid difficulties: `hard`, `medium`, `easy`", "Invalid difficulty!");
    }

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: `${difficulty} Difficulty!`,
        description: "You get <quest>"
      }]
    });
  }
}

export const c = new C();