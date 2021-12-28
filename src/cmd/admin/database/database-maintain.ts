import * as Discord from "discord.js";
// import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Database } from "../../../global";

class C extends Command {
  names = ["admin-git-prune", "admin-maintain-db"];
  help = "Updates the database.";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.update().then(() => {
      for (const id in Database.pdb) {
        // CODE ENTRY POINT
        Database.pdb[id].socialMedia = 0;
        // CODE ENTRY POINT
      }

      if (process.env.NODE_ENV) Database.updateBackup();

      Database.save().then(() => msg.channel.send({
        embeds: [{
          color: Colors.SUCCESS,
          title: "Successfully updated!",
          description: "The schema has successfully been updated!\nMake sure `genschema.ts` is up to date.",
          footer: { text: "Use &lb to find most information!" }
        }]
      }));
    });
  }
}

export const c = new C();