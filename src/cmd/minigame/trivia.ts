import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, Database, randomChoice, codestr, brackets, parseNumber, commanum } from "../../global.js";
import { trivia, users } from "../../util/data/trivia.js";
import { ActionType, checkQuest } from "../../util/data/quests.js";

const replaces = {
  "C++": "cpp",
  "C#": "csharp",
  "React": "js"
};

class C extends Command {
  names = ["trivia", "fix-code", "t"];
  help = "Find the bug and get some cycles!";
  isGame = "y" as const;

  get cooldown() {
    return 6e4;
  }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = Database.getUser(msg.author.id);
    let cycles = new Big(user.cycles);
    const cycleEarn = Big.max(new Big(user.cpp).div(50).dp(0), 10);
    if (cycles.lt(cycleEarn)) return Bot.errormsg(msg, `You need at least ${brackets(commanum(cycleEarn.toString()))} cycles to play!`, "Not enough cycles!");

    function addCycle() {
      cycles = cycles.plus(cycleEarn);
      user.cycles = cycles.toString();
    }

    function minCycle() {
      cycles = cycles.minus(cycleEarn);
      user.cycles = cycles.toString();
    }

    const question = randomChoice(trivia)[0];

    // add line numbers
    const code = question.code.split("\n");
    const length = code.length.toString().length + 1;
    // final output
    const editorCode = code.map((c, i) => `${(i + 1).toString().padEnd(length)}| ${c}`).join("\n");
    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: `${brackets(question.lang)} Trivia!`,
        description: `Respond with the line of the bug!

${codestr(editorCode, replaces[question.lang as keyof typeof replaces] || question.lang)}`
      }]
    }).then(() => {
      const filter = (m: Discord.Message) => msg.author.id == m.author.id;

      msg.channel.awaitMessages({ filter, time: 60000, max: 1, errors: ["time"] })
        .then(collected => {
          const reply = collected.first();
          const num = parseNumber(reply?.content);
          if (isNaN(num)) {
            // can't use `Bot` here... it throws error!
            msg.channel.send({
              embeds: [{
                title: "Not a number!",
                color: Colors.WARNING,
                description: `You didn't input a number!
                Use \`&trivia\` to try again!`
              }]
            });

            return;
          }

          const username = randomChoice(users)[0];
          if (num == question.line) {
            const field = checkQuest(user, ActionType.Trivia);

            msg.channel.send({
              embeds: [{
                title: "Correct!",
                color: Colors.PRIMARY,
                description: `You found the bug!

${username} thanks you!
+ ${brackets(commanum(cycleEarn.toString()))} cycles`,
                fields: field ? [field] : []
              }]
            });
            addCycle();
          } else {
            msg.channel.send({
              embeds: [{
                title: "Wrong!",
                color: Colors.ERROR,
                description: `You made ${username} spend 10 hours debugging...
**IN THE WRONG SPOT**

\\- ${brackets(commanum(cycleEarn.toString()))} cycles`
              }]
            });
            minCycle();
          }
        })
        .catch(() => {
          msg.reply({
            embeds: [{
              title: "Time's up!",
              color: Colors.ERROR,
              description: `You ran out of time!

- ${brackets(commanum(cycleEarn.toString()))} cycles

Use \`&trivia\` to try again!`
            }]
          });

          minCycle();
        });
    });
  }
}

export const c = new C();