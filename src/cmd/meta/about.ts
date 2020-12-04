import * as Discord from "discord.js";
import { Command, Colors, brackets, plural, formatDate } from "../../global";

class C extends Command {
  names = ["uptime", "bot-about", "bot-servers"];
  help = "View some general statistics about the bot.";
  isGame = 'n' as 'n';

  exec(msg: Discord.Message, args: string[], client: Discord.Client) {
    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Bot Statistics",
        description: "View bot statistics!",
        fields: [{
          name: "Uptime",
          value: formatDate(client.uptime!)
        }, {
          name: "Servers",
          value: `In ${brackets(client.guilds.cache.size.toString())} server${plural(client.guilds.cache.size)}!`
        }, {
          name: "Users",
          value: `The bot is overseeing ${brackets(client.users.cache.size.toString())} user${plural(client.users.cache.size)}.`
        }, {
          name: "Creator",
          value: "[Junhao Zhang](https://github.com/cursorweb) ([@Coder100](https://repl.it/@Coder100)) with TypeScript."
        }]
      }
    });
  }
}

export const c = new C();