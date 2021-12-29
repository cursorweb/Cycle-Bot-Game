import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, Bot, Database, randomChoice, codestr, brackets, parseNumber } from "../../global.js";
import { trivia, users } from "../../util/data/trivia.js";

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
    if (cycles.lt(2)) return Bot.errormsg(msg, `You need at least ${brackets("2")} cycles to play!`, "Not enough cycles!");

    const addCycle = () => {
      cycles = cycles.plus(2);
      user.cycles = cycles.toString();
    };

    const minCycle = () => {
      cycles = cycles.minus(2);
      user.cycles = cycles.toString();
    };

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

${codestr(editorCode, "")}`
      }]
    }).then(() => {
      const filter = (m: Discord.Message) => msg.author.id == m.author.id;

      msg.channel.awaitMessages({ filter, time: 60000, max: 1, errors: ["time"] })
        .then(msgs => {
          const reply = msgs.first();
          const num = parseNumber(reply?.content);
          if (isNaN(num)) {
            // can't use `Bot` here... it throws error!
            return msg.channel.send({
              embeds: [{
                title: "Not a number!",
                color: Colors.WARNING,
                description: `You didn't input a number!
Use \`&trivia\` to try again!`
              }]
            });
          }

          const user = randomChoice(users)[0];
          if (num == question.line) {
            msg.channel.send({
              embeds: [{
                title: "Correct!",
                color: Colors.SUCCESS,
                description: `You found the bug!

${user} thanks you!
+ ${brackets("2")} cycles`
              }]
            });
            addCycle();
          } else {
            msg.channel.send({
              embeds: [{
                title: "Wrong!",
                color: Colors.ERROR,
                description: `You made ${user} spend 10 hours debugging...
**IN THE WRONG SPOT**

${question.line} == ${num}
- ${brackets("2")} cycles`
              }]
            });
            minCycle();
          }
        })
        .catch(() => {
          msg.reply({
            embeds: [{
              title: "Times up!",
              color: Colors.ERROR,
              description: `You ran out of time!

- ${brackets("2")} cycles

Use \`&trivia\` to try again!`
            }]
          });

          minCycle();
        });
    });
  }
}

export const c = new C();