import * as Discord from "discord.js";
import { Command, Bot, Colors, brackets, codestr, constrain } from "../../../global.js";
import { ItemEnum } from "../../../util/data/item.js";

class C extends Command {
  names = ["eval-docs"];
  help = "Get quick code snippets";
  examples = ["eval-docs", "eval-docs __INSERT_ID__ 1"];
  isGame = "n" as const;

  // don't forget to change!
  isAdmin = true;

  exec(msg: Discord.Message, args: string[], _1: Discord.Client) {
    const page = constrain(Number(args[1]) || 1, 1, Infinity);
    const id = args[0] || "__INSERT_ID__";

    const data: ({ desc: string, code: string })[] = [{
      desc: "Set a user",
      code: `Database.setUser(${id}, Object.assign(Database.defaultSchema, {
  ___INSERT_CODE__
}, { name: user.name }))`
    }, {
      desc: "Get a specific user",
      code: `return Database.pdb["${id}"];`
    }, {
      desc: "Set Idle-Coins",
      code: `let inv = Database.pdb["${id}"].inv;
let coins = new Big(inv[ItemEnum.IdleCoin] || 0);
__INSERT_CODE__
inv[ItemEnum.IdleCoin] = coins.toString();
return coins;`
    }, {
      desc: "Preview TPM/Cycles/Text",
      code: `const user = Database.pdb["${id}"];
let ___ = new Big(user.cycles/text/tpc/cpp/tpm);
__INSERT_CODE__
return ___;`
    }, {
      desc: "Set TPM/Cycles/Text",
      code: `const user = Database.pdb["${id}"];
let ___ = new Big(user.cycles/text/tpc/cpp/tpm);
__INSERT_CODE__
user.___ = ___.toString();
return ___;`
    }, {
      desc: "ItemEnum Lookup Table",
      code: Object.keys(ItemEnum).filter(k => isNaN(Number(k))).join(" ")
    }];

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