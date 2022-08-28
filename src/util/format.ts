import * as Discord from "discord.js";
import { constrain } from "./util.js";

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

// [...ooo]
const black = "■";
const white = "□";

/**
 * Progress, assumes width > percent
 * @param percent 0-width
 * @param width max
 */
function progress(percent: number, width: number) {
  return `[${black.repeat(percent)}${white.repeat(width - percent)}]`;
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
        description: `Invalid arguments!\nExpected \`${expect.join(", ")}\` arguments but got \`${got}\` argument${got == 1 ? "" : "s"}.`,
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
    function getComponents() {
      const components = [];
      if (page > 1) {
        components.push(
          new Discord.MessageButton()
            .setCustomId("prev")
            .setEmoji("\u2B05") // <
            .setStyle("SECONDARY")
        );
      }
      components.push(
        new Discord.MessageButton()
          .setCustomId("next")
          .setEmoji("\u27A1") // >
          .setStyle("SECONDARY")
      );
      return new Discord.MessageActionRow().addComponents(...components);
    }

    const initialMessage = await msg.reply({
      embeds: [
        send(
          page, data.slice(
            constrain(count * (page - 1), 0, data.length), constrain(count * page, 0, data.length)
          )
        )
      ],
      allowedMentions: {
        repliedUser: false
      },
      components: [
        getComponents()
      ]
    });

    const collector = initialMessage.createMessageComponentCollector({ componentType: "BUTTON", time: 160000, filter: (inter) => inter.user.id === msg.author.id });

    collector.on("collect", async (choice) => {
      if (choice.customId == "prev") page--;
      else if (choice.customId == "next") page++;
      await choice.update({
        embeds: [
          send(
            page, data.slice(
              constrain(count * (page - 1), 0, data.length), constrain(count * page, 0, data.length)
            )
          )
        ],
        components: [
          getComponents()
        ]
      });
    });

    collector.on("end", async () => {
      await initialMessage.edit({
        components: []
      });
    });
  }
}

export { Colors, brackets, noun, hidden, codestr, progress, formatDate, Bot };