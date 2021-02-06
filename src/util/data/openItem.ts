// refer to ./item.ts for metadata.
import * as Discord from "discord.js";
import { Database, random, brackets, commanum } from "../../global";
import { BigNumber as Big } from "bignumber.js";
// import { items } from "./item";

// this way, we can utilize the inefficiency of an array search.
// we will check if this object has an implementation, and if not, there won't be one!
export const openItem: { [i: number]: (user: Database.CycleUser, amt: number) => Discord.EmbedFieldData } = {
  1: (user, amt) => {
    let cycles = new Big(user.cycles);
    let cpp = new Big(user.cpp);

    let num = cpp.plus(Math.round(random(1, 5))).times(amt);
    let newCycles = cycles.plus(num);

    user.cycles = newCycles.toString();
    
    return {
      name: "Text text text!",
      value: `You use your phone.
It's cheap, so it dies quickly!
+ ${brackets(commanum(num.toString()))} cycles!`
    };
  },
  2: (user, amt) => {
    let text = new Big(user.text);
    let tpc = new Big(user.tpc);

    let num = tpc.plus(Math.round(random(1, 5))).times(amt);
    let newText = text.plus(num);

    user.text = newText.toString();
    
    return {
      name: "Code code code!",
      value: `You use your extra finger.
It's not your finger, and breaks!
+ ${brackets(commanum(num.toString()))} text!`
    };
  },
  3: (user, amt) => {
    let text = new Big(user.text);
    let tpc = new Big(user.tpc);

    let num = tpc.times((10 + amt) / 10).dp(0);
    let newText = text.plus(num);

    user.text = newText.toString();
    
    return {
      name: "Code code code!",
      value: `You drink some coffee.
You feel a surge of energy!
+ ${brackets(commanum(num.toString()))} text!`
    };
  },
};