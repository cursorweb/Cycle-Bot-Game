import * as Discord from "discord.js";
import { Command, Colors, Bot, hidden, parseNumber } from "../../global";

class C extends Command {
  names = ["dice-roll", "roll-dice"];
  help = "Roll a dice!";
  examples = ["dice-roll min max", "dice-roll"];
  isGame = 'n' as 'n';

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length == 0) {
      msg.channel.send({
        embed: {
          color: Colors.SUCCESS,
          title: "Roll a dice!",
          description: `You rolled the dice, and you got...
${hidden(Math.floor(Math.random() * 6 + 1).toString())}`
        }
      });
    } else if (args.length == 2) {
      let min = parseNumber(args[0]);
      let max = parseNumber(args[1]);
      if (isNaN(min) || isNaN(max)) Bot.errormsg(msg, "Please pass in a number for both arguments!");
      else if (min >= max) Bot.errormsg(msg, "The maximum number has to be greater than (and not equal to) the minimum number!");
      else msg.channel.send({
        embed: {
          color: Colors.SUCCESS,
          title: "Roll a dice!",
          description: `You rolled the dice, and you got...
${hidden(Math.floor(Math.random() * (max - min + 1) + min).toString())}`
        }
      });
    } else Bot.argserror(msg, args.length, [0, 2]);
  }
}

export const c = new C();