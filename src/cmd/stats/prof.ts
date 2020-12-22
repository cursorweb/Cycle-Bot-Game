import * as Discord from "discord.js";
import { Command, Colors, Bot, Database, parseMention, brackets, commanum } from "../../global";
import { CycleUser } from "../../util/database/database";

class C extends Command {
  names = ["profile", "prof"];
  help = "View yours or someone elses' profile.";
  examples = ["prof", "prof Coder100"];
  isGame = 'p' as 'p';

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);

    let user: CycleUser;

    if (args.length == 0) {
      user = Database.getUser(msg.author.id);
    } else if (args.length == 1) {
      let user_arg = parseMention(args[0]);

      if (user_arg.type == "id") {
        user = Database.getUser(user_arg.value);
        if (!user) return Bot.errormsg(msg, `User ${brackets("<@" + user_arg.value + ">")} not found.`, "User not found!");
      } else {
        let user_arr = Database.findUser(u => u.name.toLowerCase().indexOf(user_arg.value.toLowerCase()) > -1);
        if (user_arr.length == 0) return Bot.errormsg(msg, `User ${brackets(user_arg.value)} not found. Check your spelling!`, "User not found!");
        else if (user_arr.length > 1) return Bot.errormsg(msg, `Found ${brackets(user_arr.length.toString())} users.
${user_arr.slice(0, 10).map(o => `${brackets(Database.getUser(o).name)}: **${o}**`).join("\n")}`, "Multiple users found!");
        else user = Database.getUser(user_arr[0]);
      }
    }

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: `User ${brackets(user!.name)}`,

        description: `View the profile of ${brackets(user!.name)}
**Cycles**: ${commanum(user!.cycles)}
**Text**: ${commanum(user!.text)}
**Level**: ${commanum(user!.xp)}`,
        fields: [{
          name: "TPC (Text Per Code)",
          value: commanum(user!.tpc)
        }, {
          name: "CPP (Cycles Per Post)",
          value: commanum(user!.cpp)
        }, {
          name: "TPM (Text Per Minute)",
          value: commanum(user!.tpm)
        }],

        footer: {
          text: "Use &bal to view stats about yourself!"
        }
      }
    });
  }
}

export const c = new C();