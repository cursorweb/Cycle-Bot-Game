import * as Discord from "discord.js";
import { Command, Colors, Database } from "../../../global";

class C extends Command {
  names = ["admin-git-fetch", "admin-update-db"];
  help = "'git fetch' from firebase.";
  isGame = 'n' as 'n';
  
  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.update().then(() => msg.channel.send({
      embed: {
        color: Colors.SUCCESS,
        title: "Success!",
        description: "Successfully **updated** the database."
      }
    }));
  }
}

export const c = new C();