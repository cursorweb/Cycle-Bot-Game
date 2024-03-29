import * as Discord from "discord.js";
import { Command, Colors, Database } from "../../../global.js";

class C extends Command {
  names = ["admin-restore", "admin-load-backup"];
  help = "Loads up the backup DB.";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.updateBackup();
    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Successfully loaded the backup the database!",
        footer: { text: "Note: Use push to actually save the backup to main." }
      }]
    });
  }
}

export const c = new C();