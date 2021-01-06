import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, Database } from "../../../global";

class C extends Command {
  names = ["admin-git-prune", "admin-maintain-db"];
  help = "Updates the database.";
  isGame = 'n' as 'n';

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    for (const id in Database.pdb) {
      Database.pdb[id].level = "0";
    }

    Database.save();

    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Successfully updated!",
        description: "The schema has successfully been updated!\nMake sure `genschema.ts` is up to date.",
        footer: { text: "Use &lb to find most information!" }
      }
    });
  }
}

export const c = new C();