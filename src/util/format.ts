import * as Discord from "discord.js";
import { constrain } from "./util";

enum Colors {
  PRIMARY = "#1a8ff0",
  ERROR = "#f0351a",
  SUCCESS = "#06c012",
  WARNING = "#faa12f"
}

// [ **smth** ]
function brackets(input: string) {
  return `[ **${input}** ]`;
}

// **__noun__**
function noun(input: string) {
  return `**__${input}__**`;
}

// ||[ **`code`** ]||
function hidden(input: string) {
  return `||[ **\`${input}\`** ]||`;
}

function codestr(str: string, lang = "html") {
  return "```" + lang + '\n' + str + "```";
}

function formatDate(ms: number) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / (1000));

  return (days > 0 ? brackets(days.toString().padStart(2, '0')) + " days : " : "")
    + (hours > 0 ? brackets(hours.toString().padStart(2, '0')) + " hours : " : "")
    + (minutes > 0 ? brackets(minutes.toString().padStart(2, '0')) + " minutes : " : "")
    + brackets(seconds.toString().padStart(2, '0')) + " seconds";
}

namespace Bot {
  export function argserror(msg: Discord.Message, got: number, expect: number[]) {
    msg.channel.send({
      embed: {
        color: Colors.ERROR,
        title: "Invalid Arguments!",
        description: `Invalid arguments!\nExpected \`${expect.join(", ")}\` arguments but got \`${got}\` arguments.`,
        fields: [{
          name: "Tip",
          value: `If you have an argument with spaces, use quotes!
${codestr("&use 'cheap iphone'", "js")}`
        }, {
          name: "Tip",
          value: "Use `&help <command>` if you don't know how to use the command!"
        }]
      }
    });
  }

  export function errormsg(msg: Discord.Message, error: string, title = "Error!!") {
    msg.channel.send({
      embed: {
        color: Colors.ERROR,
        title,
        description: error,
        fields: [{
          name: "Tip",
          value: `If you have an argument with spaces, use quotes!
${codestr("&use 'cheap iphone'", "js")}`
        }, {
          name: "Tip",
          value: "Use `&help <command>` if you don't know how to use the command!"
        }]
      }
    });
  }

  /**
   * 'carousel'
   * @param msg msg (for user)
   * @param data array of item data
   * @param count how much should be in each page
   * @param send the embed to be sent
   * @param curr curr page (1)
   */
  export async function carousel<T>(msg: Discord.Message, data: T[], count: number, send: (page: number, i: T[]) => Discord.MessageEmbedOptions, curr: number = 1) {
    let page = curr;

    function recurse() {
      msg.channel.send({ embed: send(page, data.slice(constrain(count * (page - 1), 0, data.length), constrain(count * page, 0, data.length))) })
        .then(async mesg => {
          if (page > 1) await mesg.react('\u2B05'); // left
          await mesg.react('\u27A1'); // right

          function filter(reaction: Discord.MessageReaction, user: Discord.User) {
            return ['\u2B05', '\u27A1'].includes(reaction.emoji.name) && user.id == msg.author.id;
          }

          mesg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(col => {
            const choice = col.first();

            // left
            if (choice!.emoji.name == '\u2B05') page--;
            // right
            else page++;

            mesg.delete();

            recurse();
          });
        });
    }

    recurse();
  }
}

export { Colors, brackets, noun, hidden, codestr, formatDate, Bot };