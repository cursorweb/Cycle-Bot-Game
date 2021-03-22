import * as Discord from "discord.js";

import * as fs from "fs";
import * as path from "path";

import { Command, Colors, Database } from "../../global";

class C extends Command {
  names = ["admin-new-season"];
  help = "Starts a new season";
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    Database.db.collection("cycle-users").doc("users").set(
      JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "..", "database.json"), "utf-8"))
    );

    msg.channel.send({
      embed: {
        color: Colors.PRIMARY,
        title: "BOM BOM",
        description: "The new season has begun!"
      }
    });
  }
}

export const c = new C();