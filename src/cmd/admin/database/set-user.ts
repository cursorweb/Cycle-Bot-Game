import * as Discord from "discord.js";
import { Command, Colors, Database, Bot, brackets, parseMention } from "../../../global";

class C extends Command {
  names = ["admin-user-set"];
  help = "Test things out with *everything*.";
  examples = ["admin-user-set id"];
  isGame = 'n' as 'n';

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    let parsed = parseMention(args[0]);
    let id: string;

    if (parsed.type == "id") {
      if (!Database.getUser(parsed.value)) return Bot.errormsg(msg, `User ${brackets("<@" + parsed.value + ">")} not found! Check your spelling.`, "Not found!!");
      id = parsed.value;
    } else if (parsed.type == "name") {
      let ids = Database.findUser(u => u.name.toLowerCase().includes(parsed.value.toLowerCase()));
      if (ids.length == 0) return Bot.errormsg(msg, `User ${brackets(parsed.value)} not found! Check your spelling.`, "Not found!!");
      if (ids.length > 1) msg.channel.send({
        embed: {
          color: Colors.WARNING,
          title: "Warning",
          description: `Found ${brackets(ids.length.toString())} users. Using the first one.`
        }
      });

      id = ids[0];
    }

    let user = Database.getUser(id!);
    Database.setUser(id!, Object.assign({ daily: "" }, {
      cycles: "999999999", text: "999999999", xp: "0",
      tpc: "999999999", cpp: "999999999", tpm: "999999999",
      langs: null, level: "999999999", socialMedia: null,
      
      inv: [],
      bought: {
        idle: {},
        upgrades: {}
      }
    }, { name: user.name }));

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Success!",
        description: `Successfully **set** user ${brackets(user.name)}
**Database Saved**
> View profile to see more!`
      }
    });

    Database.save();
  }
}

export const c = new C();