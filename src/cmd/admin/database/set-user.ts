import * as Discord from "discord.js";
import { Command, Colors, Database, Bot, brackets } from "../../../global";

class C extends Command {
  names = ["admin-user-set"];
  help = "Test things out with *everything*.";
  examples = ["admin-user-set id"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);
    if (!Database.getUser(args[0])) return Bot.errormsg(msg, `User ID ${brackets(args[0])} not found! Check your spelling.`, "Not found!!");

    Database.setUser(args[0], {
      name: msg.author.tag,
      cycles: "999999999", text: "999999999", xp: "0",
      tpc: "999999999", cpp: "999999999", tpm: "999999999",
      langs: null, level: "999999999", socialMedia: null,
      
      inv: [],
      bought: {
        idle: {},
        upgrades: {}
      }
    });

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Success!",
        description: `Successfully **set** user ${brackets(args[0])}
**Database Saved**
> View profile to see more!`
      }
    });

    Database.save();
  }
}

export const c = new C();