import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database, constrain, random, brackets, parseNumber } from "../../global";
import { commanum } from "../../util/util";

class C extends Command {
  names = ["casino", "gamble"];
  help = "Gamble some money!";
  examples = ["casino <cycles>"];

  get cooldown() {
    return 60e3;
  }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);
    const num = parseNumber(args[0]);
    if (isNaN(num)) return Bot.usererr(msg, "Amount must be a number!");
    const amt = new Big(constrain(num, 1, Infinity));

    const user = Database.getUser(msg.author.id);
    const cycles = new Big(user.cycles);

    if (amt.gt(cycles)) return Bot.usererr(msg, "You can't bet more than your worth!");

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Choose a color!",
        description: "Choose wisely... You would win big or lose everything!"
      }]
    }).then(async mesg => {
      await mesg.react("🟦"); // blue
      await mesg.react("🟩"); // green
      await mesg.react("🟥"); // red

      function filter(reaction: Discord.MessageReaction, user: Discord.User) {
        return ["🟦", "🟩", "🟥"].includes(reaction.emoji.name ?? "") && user.id == msg.author.id;
      }

      mesg.awaitReactions({ filter, max: 1, time: 60000, errors: ["time"] }).then(() => {
        if (random(0, 3) < 1) {
          mesg.edit({
            embeds: [{
              color: Colors.SUCCESS,
              title: "You win!",
              description: `You chose the right color! You earned ${brackets(commanum(amt.toString()))} cycles!`
            }]
          });

          user.cycles = cycles.plus(amt).toString();
        } else {
          mesg.edit({
            embeds: [{
              color: Colors.ERROR,
              title: "You lose!",
              description: `You chose the wrong color. You lost ${brackets(commanum(amt.toString()))} cycles.`
            }]
          });

          user.cycles = cycles.minus(amt).toString();
        }
      });
    });
  }
}

export const c = new C();