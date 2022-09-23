import * as Discord from "discord.js";
import { Command, Bot, brackets, Colors, parseMention } from "../../global.js";

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
    let member: Discord.GuildMember | null | undefined;

    if (args.length == 0) {
      user = msg.author;
      member = msg.member;
    } else if (args.length == 1) {
      const search = args[0];

      const filter = (user: Discord.User | Discord.GuildMember) => {
        if (user.id == search) return true;
        const mention = parseMention(search);

        if (mention.type == "id") {
          return user.id == mention.value;
        }

        const duser = user instanceof Discord.User ? user : user.user;
        return duser.username.toLowerCase() == mention.value.toLowerCase() || duser.tag.toLowerCase() == mention.value.toLowerCase();
      };

      user = client.users.cache.find(filter);
      member = msg.guild?.members.cache.find(filter);
    }

    if (user) {
      msg.channel.send({
        embeds: [{
          color: Colors.PRIMARY,
          title: user.tag,
          description: `**Account Creation**: ${user.createdAt.toDateString()}
**Joined At**: ${member?.joinedAt?.toDateString() || "*User not in server*"}`,
          fields: member ? [{
            name: "Roles",
            value: member.roles.cache.map(r => `<@&${r.id}>`).join(" ")
          }] : []
        }]
      });
    } else {
      msg.channel.send({
        embeds: [{
          title: "User not found!",
          color: Colors.ERROR,
          description: `Your search, ${brackets(args[0])}
did not turn up any results!`,
          footer: {
            text: "Make sure the user is in a server that cycle is in as well!"
          }
        }]
      });
    }
  }
}

export const c = new C();