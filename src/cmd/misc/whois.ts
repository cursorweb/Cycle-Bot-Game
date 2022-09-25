import * as Discord from "discord.js";
import { Command, Bot, brackets, Colors, parseMention } from "../../global.js";

class C extends Command {
  names = ["whois", "who-is"];
  help = "Get user info about anyone!";
  examples = ["whois Hithere#6537", "whois"];
  isGame = "n" as const;

  async exec(msg: Discord.Message, args: string[], client: Discord.Client) {
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
        const val = mention.value.toLowerCase();
        return duser.username.toLowerCase() == val || duser.tag.toLowerCase() == val;
      };

      user = client.users.cache.find(filter);
      member = msg.guild?.members.cache.find(filter);
      try {
        if (!user) user = await client.users.fetch(search);
        if (!member) member = await msg.guild?.members.fetch(search);
      } catch {
        // don't care
      }
    }

    if (user) {
      msg.channel.send({
        embeds: [{
          color: Colors.PRIMARY,
          title: user.tag,
          description: `**Account Creation**: ${user.createdAt.toDateString()}
**Joined At**: ${member?.joinedAt?.toDateString() || "*User not in server*"}
**Id**: \`${user.id}\`
**View more**: ${user}`,
          thumbnail: {
            url: user.displayAvatarURL(),
          },
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