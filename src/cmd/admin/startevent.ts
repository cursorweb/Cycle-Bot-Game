import * as Discord from "discord.js";
import { Command, Colors} from "../../global.js";

import { EventItm } from "../../util/data/boosts/events.js";


class C extends Command {
  names = ["startevent"];
  help = "Starts a event!"; 


  isAdmin = true;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send("Work in progress!")



  }
}