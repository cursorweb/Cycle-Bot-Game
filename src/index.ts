/*
Invite link: https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=265280&scope=bot
*/

require("dotenv").config();

import * as Discord from 'discord.js';
import { parse } from "./cmd-parser";

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("message", (msg: Discord.Message) => {
  if (msg.author.id == client.user!.id || msg.author.bot) return;

  msg.channel.send("IM AN EW BOT");
});


client.login(process.env.TOKEN);
process.on("unhandledRejection", () => {});