import * as Discord from "discord.js";
import { Command, Bot, Colors, brackets, codestr, constrain } from "../../../global.js";

const data: ({ desc: string, code: string })[] = [{
  desc: "Set a user",
  code: `Database.setUser(__INSERT_ID__, Object.assign(Database.defaultSchema, {
  ___
}, { name: user.name }))`
}, {
  desc: "Get a specific user",
  code: "return Database.pdb[\"__INSERT_ID__\"];"
}, {
  desc: "Set Idle-Coins",
  code: `let inv = Database.pdb["__INSERT_ID__"].inv;
let coins = new Big(inv[ItemEnum.IdleCoin] || 0);
__INSERT_CODE__
inv[ItemEnum.IdleCoin] = coins.toString();
return coins;`
}, {
  desc: "Set TPM/Cycles/Text",
  code: `const user = Database.pdb["__INSERT_ID__"];
let ___ = new Big(user.cycles/text/tpc/cpp/tpm);
__INSERT_CODE__
return ___;`
}];

class C extends Command {
  names = ["eval-docs"];
  help = "Get quick code snippets";
  examples = ["eval-docs"];
  isGame = "n" as const;

  // don't forget to change!
  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _1: Discord.Client) {
    const page = constrain(Number(args[0]) || 1, 1, Infinity);

    Bot.carousel(msg, data, 4, (page, itms) => ({
      color: Colors.PRIMARY,
      title: "Docs!",
      description: `Page: ${brackets(page.toString())}${itms.length == 0 ? "\nNo more items!\nYou've gone far enough!" : ""}`,
      fields: itms.map(({ desc, code }) => ({
        name: desc,
        value: codestr(code, "js")
      }))
    }), page);
  }
}

export const c = new C();