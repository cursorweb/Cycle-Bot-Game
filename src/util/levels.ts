import * as Discord from "discord.js";
import Big from "bignumber.js";
import { Database, brackets, commanum } from "../global.js";

export function levelUp(user: Database.CycleUser): Discord.APIEmbedField | undefined {
  const level = new Big(user.level);
  let xp = new Big(user.xp);

  xp = xp.plus(1);

  if (xp.gte(level.times(5))) {
    xp = new Big(0);
    user.level = level.plus(1).toString();

    const newCpp = new Big(user.cpp).times(1.01).dp(0);
    const newTpc = new Big(user.tpc).times(1.02).dp(0);
    const newCycles = new Big(user.cycles).times(1.1).dp(0);
    const newText = new Big(user.text).times(1.15).dp(0);

    user.cpp = newCpp.toString();
    user.tpc = newTpc.toString();
    user.cycles = newCycles.toString();
    user.text = newText.toString();

    user.xp = xp.toString();

    return {
      name: "Level up!",
      value: `You are now level ${brackets(commanum(user.level))}!`
    };
  }

  user.xp = xp.toString();
}