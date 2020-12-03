import * as Discord from "discord.js";
import { Command, Colors, Database, Bot, brackets } from "../../../global";

class C extends Command {
  names = ["admin-user-reset"];
  help = "Test things out with *nothing*.";
  examples = ["admin-user-reset id"];

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);
    if (!Database.getUser(args[0])) return Bot.errormsg(msg, `User ID ${brackets(args[0])} not found! Check your spelling.`, "Not found!!");

    Database.setUser(args[0], Database.genSchema(msg.author));

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Success!",
        description: `Successfully **reset** user ${brackets(args[0])}
**Database Saved**
> View profile to see more!`
      }
    });

    Database.save();
  }
}

export const c = new C();