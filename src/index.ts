/*
Invite link: https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=265280&scope=bot
*/

require("dotenv").config();

import * as Discord from "discord.js";
import * as g from "./global";

import { parse } from "./cmd-parser";
import { help, load } from "./loader";

import admins from "./util/admin.json";

const client = new Discord.Client();
let commands: { [i: string]: g.Command[] }, gcmdarr: g.Command[];

client.on("ready", async () => {
  client.user!.setPresence({ activity: { name: "&help for help!", type: "PLAYING" }, status: "idle" });
  console.log(`Logged in as ${client.user!.tag}!`);

  commands = await load();
  gcmdarr = Object.keys(commands).reduce((prev: g.Command[], kurr): g.Command[] => prev.concat(commands[kurr]), []);

  console.log(`Loaded ${gcmdarr.length} commands.`)
});

client.on("message", (msg: Discord.Message) => {
  let cmd = parse("&", msg.content);
  if (msg.author.id == client.user!.id || msg.author.bot || !cmd) return;

  if (cmd.command == "help") {
    help(msg, cmd.args, commands);
  } else {
    let found = false;

    for (const cmdclss of gcmdarr) {
      if (cmdclss.names.includes(cmd.command)) {
        if (cmdclss.isAdmin) {
          if (admins.includes(msg.author.id)) cmdclss.exec(msg, cmd.args, client);
          else {
            msg.channel.send("haha you don't have the perms!")
          }
        } else cmdclss.exec(msg, cmd.args, client);

        found = true;
        break;
      }
    }

    if (!found) msg.channel.send("is not valid command!")
  }

  /* msg.channel.send(`pardone, but your message was parsed as
**Command**: ${cmd.command}
**Args**: ${cmd.args.map(o => "'" + o + "'").join(", ")}`); */
});


client.login(process.env.TOKEN);
process.on("unhandledRejection", () => { });