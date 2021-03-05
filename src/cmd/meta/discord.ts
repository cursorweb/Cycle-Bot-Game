import * as Discord from "discord.js";
import { Command, Colors, Bot, plural } from "../../global";

class C extends Command {
  names = ["discord"]
  help = "The link to the discord server"
  

    exec(msg: Discord.Message, args: string[]) {
    msg.channel.send("https://discord.gg/gmbAQHnJjy");
  }
}

export const c = new C();
