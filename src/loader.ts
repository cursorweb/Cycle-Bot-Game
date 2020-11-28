import * as path from "path";
import * as fs from "fs";

import * as Discord from "discord.js";
import * as g from "./global";

async function load(): Promise<g.Command[]> {
  let output: g.Command[] = [];

  async function loadDir(dir: string) {
    for (const file of fs.readdirSync(dir)) {
      let stat = fs.lstatSync(dir + "/" + file);
      if (stat.isFile() && file.includes(".ts")) {
        const C: g.Command = await import(dir + "/" + file);
        output.push(C);
      } else if (stat.isDirectory()) {
        await loadDir(dir + "/" + file);
      }
    }
  }

  loadDir(path.join(__dirname, "cmd"));

  return output;
}

async function help(msg: Discord.Message, args: string[]) {
  let output: { [i: string]: g.Command[] } = {};

  async function loadDir(dir: string, dirn?: string) {
    for (const file of fs.readdirSync(dir)) {
      let stat = fs.lstatSync(dir + "/" + file);
      if (stat.isFile() && file.includes(".js")) {
        const C: g.Command = (await import(dir + "/" + file)).default;
        
        if (!output[dirn!]) output[dirn!] = [];
        output[dirn!].push(C);
      } else if (stat.isDirectory()) {
        await loadDir(dir + "/" + file, dirn || file);
      }
    }
  }

  await loadDir(path.join(__dirname, "cmd"));

  if (args.length != 1) {
    msg.channel.send("Help categories (will be prettified):\n" + Object.keys(output).join(","));
  } else {
    if (!output[args[0]]) {
      msg.channel.send("(will be prettified) Help category not found.")
    } else {
      msg.channel.send("Commands (and desc) (will be prettified):\n" + output[args[0]].map(o => o.names.join(", ")).join("\n"));
    }
  }
}

export { load, help };