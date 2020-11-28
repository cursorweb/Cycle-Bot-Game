/*
Invite link: https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=265280&scope=bot
*/

require("dotenv").config();

import * as Discord from "discord.js";
import { parse } from "./cmd-parser";
import { help, load } from "./loader";

const client = new Discord.Client();

client.on("ready", () => {
  client.user!.setPresence({ activity: { name: "&help for help!", type: "PLAYING" }, status: "idle" })
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("message", (msg: Discord.Message) => {
  let cmd = parse("&", msg.content);
  if (msg.author.id == client.user!.id || msg.author.bot || !cmd) return;
  // DEBUGGING
  if (msg.guild!.id != "663057930144186391") return;

  if (cmd.command == "help") {
    help(msg, cmd.args);
  }

  msg.channel.send(`pardone, but your message was parsed as
**Command**: ${cmd.command}
**Args**: ${cmd.args.map(o => "'" + o + "'").join(", ")}`);
});


client.login(process.env.TOKEN);
process.on("unhandledRejection", () => {});