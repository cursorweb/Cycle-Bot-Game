import * as Discord from "discord.js";
import { Command, Colors, hidden, randomChoice } from "../../global.js";

class C extends Command {
  names = ["coinflip", "coin-flip"];
  help = "Flip a coin!";
  examples = ["coinflip", "coin-flip"];
  isGame = "n" as const;

  exec(msg: Discord.Message, _: string[], _1: Discord.Client) {
    msg.channel.send({
      embeds: [{
        color: Colors.SUCCESS,
        title: "Coin flip!",
        description: `You flipped a coin, and got ${hidden(randomChoice(["heads", "tails"])[0])}!`
      }]
    });
  }
}

export const c = new C();