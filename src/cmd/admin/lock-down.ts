import * as Discord from "discord.js";
import { Command, Colors, toggleLockDown, brackets } from "../../global.js";

class C extends Command {
  names = ["admin-lock-down", "admin-ld"];
  help = "Lock down the bot in case something goes wrong!";
  examples = ["admin-lock-down"];
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const result = toggleLockDown();

    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Success!",
        description: `Successfully ${brackets(result ? "Locked down" : "Unlocked")} the bot!`
      }]
    });
  }
}

export const c = new C();