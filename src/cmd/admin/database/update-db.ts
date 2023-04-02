import * as Discord from "discord.js";
import { Command, Colors, Database } from "../../../global.js";

class C extends Command {
  names = ["admin-fetch", "admin-update-db"];
  help = "'git fetch' from firebase.";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.update().then(() => {
      msg.channel.send({
        embeds: [{
          color: Colors.SUCCESS,
          title: "Success!",
          description: "Successfully **updated** the database."
        }]
      });
    });
  }
}

export const c = new C();