import * as Discord from "discord.js";
import { quests, qDiff } from "../../../util/data/quests.js";
import { Command, Colors, brackets, progress, formatDate } from "../../../global.js";
import { getUser } from "../../../util/database/database.js";


class C extends Command {
  names = ["quests", "q", "quest"];
  help = "View your daily quest!";

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    const user = getUser(msg.author.id);
    if (user.quest) {
      const { name, end, difficulty, progress: prog } = user.quest;
      const quest = quests[name];
      msg.channel.send({
        embeds: [{
          color: Colors.PRIMARY,
          title: "Quest info!",
          description: `Learn all about your **${qDiff[difficulty]}** quest:
${brackets(quest.name)}!`,
          fields: [{
            name: "Description",
            value: quest.description
          }, {
            name: "Deadline",
            value: formatDate(new Date(end).getTime() - new Date().getTime())
          }, {
            name: "Progress",
            value: `${progress(prog / quest.max * 10, 10)} (${prog.toLocaleString()} / ${quest.max.toLocaleString()})`
          }]
        }]
      });
    } else {
      msg.channel.send({
        embeds: [{
          color: Colors.ERROR,
          title: "No quest!",
          description: "Go get a quest by doing `&new-quest`!"
        }]
      });
    }
  }
}

export const c = new C();
