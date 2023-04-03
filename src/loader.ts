import { URL } from "node:url";
import * as fs from "node:fs";

import info from "./cmd/cmd.js";

import * as Discord from "discord.js";
import { Command, brackets, codestr, noun, Colors, Bot, parseNumber } from "./global.js";

function getLastItem(path: string) {
  return path.substring(path.lastIndexOf("/") + 1);
}

async function load() {
  const output: { [i: string]: { cmds: Command[], desc: string } } = {};

  async function loadDir(dir: URL, dirn?: URL) {
    const dirns = getLastItem(dirn?.toString() ?? ""); // dirnstring

    for (const file of fs.readdirSync(dir)) {
      const stat = fs.lstatSync(new URL(`${dir}/${file}`));
      if (stat.isFile() && /\.js$/.test(file)) {
        const C: Command = (await import(new URL(`${dir}/${file}`, import.meta.url).toString())).c;

        if (dirns) {
          if (!output[dirns]) output[dirns] = { cmds: [], desc: "" };

          output[dirns].cmds.push(C);
        }
      } else if (stat.isDirectory()) {
        await loadDir(new URL(`${dir.toString()}/${file}`, import.meta.url), dirn ?? new URL(file, import.meta.url));
      }
    }
  }

  await loadDir(new URL("cmd", import.meta.url));

  Object.keys(info).forEach(key => output[key].desc = info[key as keyof typeof info]);

  return output;
}

async function help(msg: Discord.Message, args: string[], output: { [i: string]: { cmds: Command[], desc: string } }) {
  if (args.length != 1) { // &help
    const fields: Discord.APIEmbedField[] = Object.keys(output).map((k) => {
      const itm = output[k];
      const cmds = itm.cmds;

      return {
        name: k,
        value: `> ${itm.desc}\n${cmds.map(n => `**&${n.names[0]}**`).join("\n")}`,
        inline: true
      };
    });

    Bot.carousel(msg, fields, 2, (page, i): Discord.APIEmbed => {
      return {
        color: Colors.PRIMARY,
        title: "Help Categories",
        description: `View the help categories! Page: ${brackets(page.toString())}${codestr("&help <command>")}
**PRO TIP**: Use \`&guide\` for a guide!`,
        fields: i.length == 0 ? [{ name: "End of Help!", value: "No more commands!" }] : i
      };
    });
  } else {
    // &help invalid
    let cmd: Command | null = null;

    for (const k in output) {
      const result = output[k].cmds.find(n => n.names.includes(args[0]));
      if (result) cmd = result;
    }

    if (!cmd) return Bot.usererr(msg, `Help for ${brackets(args[0])} was not found!`, "Command not found!");
    // &help meta
    const fields: Discord.APIEmbedField = {
      name: noun(cmd.names[0]),
      value: `${cmd.help}\
${cmd.examples.length == 0
    ? cmd.names.map(o => codestr(`&${o}`)).join("")
    : cmd.examples.map(o => codestr(`&${o}`)).join("")}\
${cmd.names.length > 1
    ? `**Aliases**: ${cmd.names.slice(1).join(",")}\n` : ""}\
${cmd.isAdmin ? `${brackets("ADMIN-ONLY")}\n` : ""}\
${cmd.cooldown ? `**Cooldown**: **${cmd.cooldown}**ms` : ""}`,
      inline: false
    };

    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: `Help ${brackets(args[0])}`,
        description: `View the help for ${brackets(args[0])}!`,
        fields: [fields]
      }]
    });
  }
}

function verifyHuman(msg: Discord.Message, args: string[], commandsUsed: { [i: string]: [number, string, number] }) {
  // commands used, input, answer
  const user = commandsUsed[msg.author.id];

  if (!user || user[0] < 100) return false;

  if (parseNumber(args[0]) != user[2]) {
    msg.channel.send({
      embeds: [{
        color: Colors.ERROR,
        title: "Error!",
        description: `You gave the wrong answer!
If you forgot, your input was ${brackets(user[1])}\n
For example, if you get **1**, type in ${codestr("&verify 1")}`,
        footer: {
          text: "You cannot continue until you complete this challenge!"
        }
      }]
    });

    return false;
  }
  msg.channel.send({
    embeds: [{
      color: Colors.SUCCESS,
      title: "Challenge Complete!",
      description: "You may now continue."
    }]
  });

  return true;
}

export { load, help, verifyHuman };