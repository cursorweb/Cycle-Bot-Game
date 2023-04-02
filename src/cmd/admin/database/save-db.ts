import * as Discord from "discord.js";
import { Command, Colors, Database } from "../../../global.js";

class C extends Command {
  names = ["admin-save", "admin-save-db"];
  help = "Save current db to firebase.";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    (process.env.NODE_ENV ? Database.saveBackup() as Promise<void> : Database.save() as Promise<void>).then(() => Database.update().then(() => {
      msg.channel.send({
        embeds: [{
          color: Colors.SUCCESS,
          title: "Success!",
          description: "Successfully **saved** and **updated** the database."
        }]
      });
    }));
  }
}

export const c = new C();