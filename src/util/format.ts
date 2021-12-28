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
  return `\`\`\`${lang}\n${str}\`\`\``;
}

function formatDate(ms: number) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor(ms % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  const minutes = Math.floor(ms % (60 * 60 * 1000) / (60 * 1000));
  const seconds = Math.floor(ms % (60 * 1000) / 1000);

  return `${(days > 0 ? `${brackets(days.toString().padStart(2, "0"))} days : ` : "")
    + (hours > 0 ? `${brackets(hours.toString().padStart(2, "0"))} hours : ` : "")
    + (minutes > 0 ? `${brackets(minutes.toString().padStart(2, "0"))} minutes : ` : "")
    + brackets(seconds.toString().padStart(2, "0"))} seconds`;
}

namespace Bot {
  export class BotErr extends Error { }

  export function argserror(msg: Discord.Message, got: number, expect: number[]) {
    msg.channel.send({
      embeds: [{
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
      }]
    });
    throw new BotErr();
  }

  /**
   * Sends *without* problem-solving. Good for internal errors.
   * @param msg msg
   * @param error error
   * @param title title
   */
  export function errormsg(msg: Discord.Message, error: string, title = "Error!!") {
    msg.channel.send({
      embeds: [{
        color: Colors.ERROR,
        title,
        description: error
      }]
    });
    throw new BotErr();
  }

  /**
   * Sends *with* problem-solving. Good for argument/user input errors.
   * @param msg msg
   * @param error error
   * @param title title
   */
  export function usererr(msg: Discord.Message, error: string, title = "Error!!") {
    msg.channel.send({
      embeds: [{
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
      }]
    });
    throw new BotErr();
  }

  /**
   * 'carousel'
   * @param msg msg (for user)
   * @param data array of item data
   * @param count how much should be in each page
   * @param send the embed to be sent
   * @param curr curr page (1)
   */
  export async function carousel<T>(msg: Discord.Message, data: T[], count: number, send: (_: number, _1: T[]) => Discord.MessageEmbedOptions, curr = 1) {
    let page = curr;
    const initialMessage = await msg.channel.send({
      embeds: [
        send(
          page, data.slice(
            constrain(count * (page - 1), 0, data.length), constrain(count * page, 0, data.length)
          )
        )
      ]
    });
    const react = async() => {
      if (initialMessage.reactions.cache.has("\u2B05") && initialMessage.reactions.cache.has("\u27A1")) return;
      if (page > 1) {
        // left
        await initialMessage.reactions.removeAll();
        await initialMessage.react("\u2B05");
      }
      await initialMessage.react("\u27A1"); // right
    };
    await react();

    const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
      return ["\u2B05", "\u27A1"].includes(reaction.emoji.name ?? "") && user.id == msg.author.id;
    };

    const coll = initialMessage.createReactionCollector({ filter, time: 160000 });
    coll.on("collect", async(choice) => {
      choice.users.remove(msg.author);
      // left
      if (choice?.emoji.name == "\u2B05") page--;
      // right
      else page++;
      await react();
      await initialMessage.edit({
        embeds: [
          send(
            page, data.slice(
              constrain(count * (page - 1), 0, data.length), constrain(count * page, 0, data.length)
            )
          )
        ]
      });
    });
  }
}

export { Colors, brackets, noun, hidden, codestr, formatDate, Bot };