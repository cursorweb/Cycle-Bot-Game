import * as Discord from "discord.js";

enum Colors {
  PRIMARY = "#1a8ff0",
  ERROR = "#f0351a",
  SUCCESS = "#3bf11b",
  WARNING = "#faa12f"
};

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

export { Colors, brackets, noun, hidden, codestr, Bot };