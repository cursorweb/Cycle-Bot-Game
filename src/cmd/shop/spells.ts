/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from "discord.js";
import { Command, Colors, Bot, Database, brackets, constrain, parseNumber, codestr } from "../../global";
import { boosts } from "../../util/data/boosts/boosts";
import { spells } from "../../util/data/boosts/spells";

class C extends Command {
  names = ["spells", "spell", "spell-book", "spellbook"];
  help = "Look at all the spells or use a spell!";
  examples = ["spells 3", "spells"];

  exec(msg: Discord.Message, args: string[]) {
    if (args.length > 1) return Bot.argserror(msg, args.length, [0, 1]);
    const num = parseNumber(args[0]);
    if (args[1] && isNaN(num)) return Bot.usererr(msg, "The page must be a number!");
    const page = constrain(num || 1, 1, Infinity);
    const data = spells.map(itm => {
      const boost = boosts[itm.drops];
      return `[ ${boost.name} ][ ${itm.success}% success ]
<+ ${boost.tpc || 0}% TPC> <+ ${boost.cpp || 0}% CPP> <+ ${boost.tpm || 0}% TPM>
> ${boost.description}`;
    });

    Bot.carousel(msg, data, 5, (page, i) => ({
      color: Colors.PRIMARY,
      title: "Spells!",
      description: `Spellbook! Page ${brackets(page.toString())}.
${i.length > 0 ? codestr(i.join("\n\n"), "md") : codestr(`[ NO ][ MORE ][ SPELLS ]
> You've gone far enough!`, "md")}`
    }), page);
  }
}

export const c = new C();