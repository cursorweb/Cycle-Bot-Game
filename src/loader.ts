import * as path from "path";
import * as fs from "fs";

import * as Discord from "discord.js";
import { Command, brackets, codestr, noun, Colors, Bot } from "./global";

async function load() {
  let output: { [i: string]: { cmds: Command[], desc: string } } = {};

  async function loadDir(dir: string, dirn?: string) {
    for (const file of fs.readdirSync(dir)) {
      let stat = fs.lstatSync(dir + "/" + file);
      if (stat.isFile() && /\.js$/.test(file)) {
        const C: Command = (await import(dir + "/" + file)).c;

        if (!output[dirn!]) output[dirn!] = { cmds: [], desc: "" };

        output[dirn!].cmds.push(C);
      } else if (stat.isDirectory()) {
        await loadDir(dir + "/" + file, dirn || file);
      }
    }
  }

  await loadDir(path.join(__dirname, "cmd"));

  const info: { [i: string]: string } = (await import("./cmd/cmd.json")).default;
  Object.keys(info).forEach(key => output[key].desc = info[key]);

  return output;
}

async function help(msg: Discord.Message, args: string[], output: { [i: string]: { cmds: Command[], desc: string } }) {
  if (args.length != 1) { // &help
    let fields: Discord.EmbedFieldData[] = Object.keys(output).map((k): Discord.EmbedFieldData => ({
      name: k,
      value: `> ${output[k].desc}\n${brackets(output[k].cmds.length.toString())} **commands**`
    }));

    Bot.carousel(msg, fields, 2, (page, i) => {
      return {
        color: Colors.PRIMARY,
        title: "Help Categories",
        description: `View the help categories! Page: ${brackets(page.toString())}${codestr("<&help category>")}`,
        fields: i
      }
    });
  } else {
    // &help invalid
    if (!output[args[0]]) Bot.errormsg(msg, `Help category for ${brackets(args[0])} was not found!`, "Error");
    else { // &help meta
      let fields: Discord.EmbedField[] = output[args[0]].cmds.map((cmd): Discord.EmbedField => ({
        name: noun(cmd.names[0]),
        value: `${cmd.help}\
${cmd.examples.length == 0
            ? cmd.names.map(o => codestr(`<&${o}>`)).join("")
            : cmd.examples.map(o => codestr(`<&${o}>`)).join("")}\
${cmd.names.length > 1
            ? `**Aliases**: ${cmd.names.slice(1).join(",")}` : ""}
${cmd.isAdmin ? brackets("ADMIN-ONLY") : ""}`,
        inline: true
      }));

      msg.channel.send({
        embed: {
          color: Colors.PRIMARY,
          title: `Help ${brackets(args[0])}`,
          description: `View the help for ${brackets(args[0])}!`,
          fields
        }
      });
    }
  }
}

function verifyHuman(msg: Discord.Message, args: string[], commandsUsed: { [i: string]: [number, string, number] }) {
  // commands used, input, answer
  let user = commandsUsed[msg.author.id];

  if (!user) return false;

  if (Number(args[0]) != user[2]) {
    msg.channel.send({
      embed: {
        color: Colors.ERROR,
        title: "Error!",
        description: `You gave the wrong answer!
If you forgot, your input was ${brackets(user[1])}\n
For example, if you get **1**, type in ${codestr("&verify 1")}`,
        footer: {
          text: "You cannot continue until you complete this challenge!"
        }
      }
    });

    return false;
  } else {
    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Challenge Complete!",
        description: "You may now continue."
      }
    });

    return true;
  }
}

export { load, help, verifyHuman };