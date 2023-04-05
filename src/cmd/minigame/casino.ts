import * as Discord from "discord.js";
import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, Database, constrain, random, brackets, parseNumber } from "../../global.js";
import { commanum } from "../../util/util.js";
import { ActionType, checkQuest } from "../../util/data/quests.js";

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
      }],
      components: [
        new ActionRowBuilder<ButtonBuilder>()
          .addComponents([
            new ButtonBuilder()
              .setCustomId("red")
              .setLabel("\u200b")
              .setStyle(ButtonStyle.Danger)
          ])
          .addComponents([
            new ButtonBuilder()
              .setCustomId("green")
              .setLabel("\u200b")
              .setStyle(ButtonStyle.Success)
          ])
          .addComponents([
            new ButtonBuilder()
              .setCustomId("blue")
              .setLabel("\u200b")
              .setStyle(ButtonStyle.Primary)
          ])
      ]
    }).then(async mesg => {
      const collector = mesg.createMessageComponentCollector({
        filter: (inter) => inter.user.id == msg.author.id,
        time: 60000,
        max: 1,
        componentType: Discord.ComponentType.Button
      });

      collector.on("collect", () => {
        if (random(0, 3) < 1) {
          const field = checkQuest(user, ActionType.Bet);

          mesg.edit({
            embeds: [{
              color: Colors.PRIMARY,
              title: "You win!",
              description: `You chose the right color! You earned ${brackets(commanum(amt.toString()))} cycles!`,
              fields: field ? [field] : []
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

      collector.on("end", async collected => {
        if (collected.size == 0) {
          await mesg.edit({
            embeds: [{
              color: Colors.ERROR,
              title: "You lose!",
              description: `You didn't choose a color. You lost ${brackets(commanum(amt.toString()))} cycles.`
            }]
          });
        }

        await mesg.edit({
          components: []
        });
      });
    });
  }
}

export const c = new C();