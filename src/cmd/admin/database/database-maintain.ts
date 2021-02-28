import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database } from "../../../global";

class C extends Command {
  names = ["admin-git-prune", "admin-maintain-db"];
  help = "Updates the database.";
  isGame = 'n' as 'n';

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.update().then(() => {
      for (const id in Database.pdb) {
        // CODE ENTRY POINT
        let temp: { [i: number]: string } = {};
        for (const key in Database.pdb[id].inv) {
          temp[key] = Database.pdb[id].inv[key];
        }

        Database.pdb[id].inv = temp;
        // CODE ENTRY POINT
      }

      if (process.env.NODE_ENV) Database.updateBackup();

      Database.save().then(() => msg.channel.send({
        embed: {
          color: Colors.SUCCESS,
          title: "Successfully updated!",
          description: "The schema has successfully been updated!\nMake sure `genschema.ts` is up to date.",
          footer: { text: "Use &lb to find most information!" }
        }
      }));
    });
  }
}

export const c = new C();