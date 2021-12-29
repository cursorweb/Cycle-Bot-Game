import * as Discord from "discord.js";
import { Command, Colors, Database, Bot, brackets, parseMention, cleanName } from "../../../global.js";

class C extends Command {
  names = ["admin-user-set"];
  help = "Test things out with *everything*.";
  examples = ["admin-user-set id"];
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) return Bot.argserror(msg, args.length, [1]);

    const parsed = parseMention(args[0]);
    let id: string;

    if (parsed.type == "id") {
      if (!Database.getUser(parsed.value)) return Bot.usererr(msg, `User ${brackets(`<@${ parsed.value }>`)} not found! Check your spelling.`, "Not found!!");
      id = parsed.value;
    } else {
      const ids = Database.findUser(u => u.name.toLowerCase().includes(parsed.value.toLowerCase()));
      if (ids.length == 0) return Bot.usererr(msg, `User ${brackets(cleanName(parsed.value))} not found! Check your spelling.`, "Not found!!");
      if (ids.length > 1) {
        msg.channel.send({
          embeds: [{
            color: Colors.WARNING,
            title: "Warning",
            description: `Found ${brackets(ids.length.toString())} users. Using the first one.`
          }]
        });
      }

      id = ids[0];
    }

    const user = Database.getUser(id);
    Database.setUser(id, Object.assign(Database.defaultSchema, {
      cycles: "999999999", text: "999999999",
      tpc: "999999999", cpp: "999999999", tpm: "999999999"
    }, { name: user.name }));

    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Success!",
        description: `Successfully **set** user ${brackets(cleanName(user.name))}
**Database Saved**
> View profile to see more!`
      }]
    });

    process.env.NODE_ENV ? Database.saveBackup() : Database.save();
  }
}

export const c = new C();