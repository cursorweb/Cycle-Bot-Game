import * as Discord from "discord.js";

enum Colors {
  PRIMARY = "#1a8ff0",
  ERROR = "#f0351a",
  SUCCESS = "#3bf11b",
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
        description: `Invalid arguments!\nExpected \`${expect.join(", ")}\` arguments but got \`${got}\` arguments.`
      }
    });
  }

  export function errormsg(msg: Discord.Message, error: string, title = "Error!!") {
    msg.channel.send({
      embed: {
        color: Colors.ERROR,
        title,
        description: error
      }
    });
  }
}

export { Colors, brackets, noun, hidden, codestr, formatDate, Bot };