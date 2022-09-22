import * as Discord from "discord.js";
import { Command, Bot, parseMention } from "../../global.js";

class C extends Command {
  names = ["whois", "who-is"];
  help = "Get user info about anyone!";
  examples = ["whois Hithere#6537", "whois"];
  isGame = "n" as const;

  exec(msg: Discord.Message, args: string[], client: Discord.Client) {
    if (args.length > 2) {
      return Bot.argserror(msg, args.length, [0, 1]);
    }

    let user: Discord.User | undefined;
    if (args.length == 0) {
      user = msg.author;
    } else if (args.length == 1) {
      const search = args[0];
      user = client.users.cache.find(user => {
        if (user.id == search) return true;
        const mention = parseMention(search);

        if (mention.type == "id") {
          return user.id == mention.value;
        }

        return user.username.toLowerCase() == mention.value;
      });
    }

    if (user) {
      msg.channel.send("todo");
    } else {
      msg.channel.send("User not found1");
    }
  }
}

export const c = new C();