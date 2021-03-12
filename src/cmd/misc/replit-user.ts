import * as fetch from "node-fetch";
import * as Discord from "discord.js";
import { Command, Colors, Bot, brackets, codestr, commanum } from "../../global";

class C extends Command {
  names = ["replit-user", "repl-user"];
  help = "Get the cycles, ID, and profile of a repl.it user.";
  examples = ["replit-user Coder100"];
  isGame = 'n' as 'n';

  get cooldown() { return 3e4; }

  async exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) Bot.argserror(msg, args.length, [1]);
    else {
      const data = await fetch("https://repl.it/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://repl.it",
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/2.0"
        },
        body: JSON.stringify({
          query: "query user($name:String!){userByUsername(username:$name){username,url,id,karma,image,bio,languages(limit:3){displayName,tagline}}}",
          variables: {
            name: args[0]
          }
        })
      }).then((e: any) => e.json());

      const user: {
        username: string, url: string, id: number,
        karma: number, image: string, bio: string,
        languages: { displayName: string, tagline: string }[]
      } = data.data.userByUsername;

      if (user == null) Bot.usererr(msg, `The user ${brackets(args[0])} could not be found.\nCheck your spelling!`, "User not found!")
      else msg.channel.send({
        embed: {
          color: Colors.SUCCESS,
          title: `User card for ${brackets(user.username)}`,
          author: {
            url: "https://repl.it" + user.url,
            icon_url: user.image,
            name: user.username
          },
          description: `[@${user.username}](https://repl.it${user.url}) (${commanum(user.karma.toString())})
**ID**: ${user.id}\n${codestr(user.bio, "txt")}`,
          thumbnail: {
            url: user.image
          },
          fields: user.languages.map(itm => ({
            name: itm.displayName,
            value: itm.tagline,
            inline: true
          }))
        }
      });
    }
  }
}

export const c = new C();