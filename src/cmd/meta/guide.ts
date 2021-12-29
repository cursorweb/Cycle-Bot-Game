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
**&code** Use this command to write some code!
**&post** Once you make some code, you can post it for some *cycles*.
**&shop** Use the shop to see the available upgrades you can buy.
**&lb** View the leaderboard, and see who has the most cycles!
**&vote** Vote for the bot on top.gg :)
**&daily** Get your daily reward!
**&help** View more help commands!

[**Discord Server**](https://discord.gg/4vTPWdpjFz) | [**Wiki**](https://github.com/cursorweb/Cycle-Bot-Game/wiki) | [**Bot Invite**](https://discord.com/api/oauth2/authorize?client_id=781939317450342470&permissions=265280&scope=bot)`,
        fields: [{
          name: "Code",
          value: "This is the stuff you can use to get **cycles**"
        }, {
          name: "Cycles",
          value: "This determines your position on the leaderboard and you can use it to buy upgrades!"
        }, {
          name: "Ego coins",
          value: "Earn them by coding a lot. You can use this to buy TPM -- Text Per Minute!"
        }],
        footer: { text: "Join the Discord Server! https://discord.gg/4vTPWdpjFz" }
      }]
    });
  }
}

export const c = new C();