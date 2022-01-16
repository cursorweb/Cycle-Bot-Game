import * as Discord from "discord.js";
import { Command, Colors } from "../../global.js";

class C extends Command {
  names = ["guide", "more-help"];
  help = "View a breakdown of the bot's commands!";
  isGame = "n" as const;

  get cooldown() {
    return 10e3;
  }

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Cycle Guide!",
        description: `Welcome to the Cycle Bot! This guide explains everything you will need to know!
Join the [Discord server](https://discord.gg/4vTPWdpjFz) for more perks!

The main goal of the bot is to get as many **cycles** as possible!

To get cycles, you code:
**&code** Use this command to write some code!

Then, you post the code:
**&post** Once you make some code, you can post it for some *cycles*.

To get text/cycles faster, visit the shop:
**&shop** Use the shop to see the available upgrades you can buy.

Look at the top players:
**&lb** View the leaderboard, and see who has the most cycles!

You can also do daily tasks for cycles:
**&vote** Vote for the bot on top.gg :)
**&daily** Get your daily reward!

There's a lot more commands:
**&help** View more help commands!

[**Discord Server**](https://discord.gg/4vTPWdpjFz) | [**Wiki**](https://github.com/cursorweb/Cycle-Bot-Game/wiki) | [**Bot Invite**](https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=272448&scope=bot)`,
        fields: [{
          name: "Code",
          value: "This is the stuff you can use to get **cycles**"
        }, {
          name: "Cycles",
          value: "This determines your position on the leaderboard and you can use it to buy upgrades!"
        }, {
          name: "Chests",
          value: `Sometimes you get chests from coding. They give you **items**!
Use \`&info\` to see all items!`
        }],
        footer: { text: "Join the Discord Server! https://discord.gg/4vTPWdpjFz" }
      }]
    });
  }
}

export const c = new C();