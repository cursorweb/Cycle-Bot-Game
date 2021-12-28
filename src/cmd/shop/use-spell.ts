import * as Discord from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Command, Colors, Bot, Database, brackets } from "../../global";
import { boosts, BoostEnum } from "../../util/data/boosts/boosts";
import { spells } from "../../util/data/boosts/spells";

class C extends Command {
  names = ["use-spell", "cast-spell", "cast"];
  help = "Use a spell!";
  examples = ["use-spell"];
  isGame = "y" as const;

  get cooldown() {
    return 6e4;
  }

  exec(msg: Discord.Message, args: string[], _: Discord.Client) {
    if (args.length != 1) Bot.argserror(msg, args.length, [1]);

    const user = Database.Boost.getUser(msg.author.id);
    const userInput = args[0];

    // refer to data/boosts/spells.ts
    let itmIndex = spells.findIndex(s => boosts[s.drops].name.toLowerCase() == userInput.toLowerCase());
    if (itmIndex == -1) itmIndex = spells.findIndex(s => boosts[s.drops].name.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

    if (itmIndex == -1) {
      return Bot.usererr(msg, "Check your spelling!", "Spell not found!");
    }

    const item = spells[itmIndex];
    const boost = boosts[item.drops];

    if (Math.random() * 100 < item.success) { // success
      msg.channel.send({
        embeds: [{
          color: Colors.SUCCESS,
          title: "Success!",
          description: `You cast the ${brackets(boost.name)}...
It succeeds!`
        }]
      });
      if (!user[item.drops]) user[item.drops] = [];
      user[item.drops].push(new Date());
    } else {
      msg.channel.send({
        embeds: [{
          color: Colors.ERROR,
          title: "Failure!",
          description: `You cast the ${brackets(boost.name)}...
It backfired!`
        }]
      });
      if (!user[BoostEnum.BackfiringSpell]) user[BoostEnum.BackfiringSpell] = [];
      user[BoostEnum.BackfiringSpell].push(new Date());
    }
  }
}

export const c = new C();