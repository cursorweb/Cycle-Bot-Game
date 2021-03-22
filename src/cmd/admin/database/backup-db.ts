import * as Discord from "discord.js";
import { Command, Colors, Database } from "../../../global";

class C extends Command {
  names = ["admin-git-stash", "admin-backup-db"];
  help = "Backs up the database";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.saveBackup();
    msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Successfully backed-up the database!",
        footer: { text: "Note: Use restore to actually restore the database." }
      }
    });
  }
}

export const c = new C();