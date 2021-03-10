// refer to ./item.ts for metadata.
import * as Discord from "discord.js";
import { Database, random, brackets, commanum, hidden } from "../../global";
import { BigNumber as Big } from "bignumber.js";
import { items, ItemEnum } from "./item";

// this way, we can utilize the inefficiency of an array search.
// we will check if this object has an implementation, and if not, there won't be one!
export const openItem: { [i: number]: (user: Database.CycleUser, amt: number) => Discord.EmbedFieldData } = {
  [ItemEnum.CheapPhone]: (user, amt) => {
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
  [ItemEnum.ExtraFinger]: (user, amt) => {
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
  [ItemEnum.Coffee]: (user, amt) => {
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
  [ItemEnum.ChestChest]: (user, amt) => {
    let itemsGot: { [i: string]: number } = {};

    for (let j = 0; j < 5 * amt; j++) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (Math.random() * 100 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }
    let itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    return {
      name: "Mystery Chest!", value: `You open up the chest.
You got...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}`
    };
  },
  [ItemEnum.DailyChest]: (user, amt) => {
    let itemsGot: { [i: string]: number } = {};
    let cycles = new Big(user.cycles);
    let cpp = new Big(user.cpp);
    let cyclesGot = cpp.times(2);
    cycles = cycles.plus(cyclesGot);

    user.cycles = cycles.toString();

    for (let j = 0; j < 10 * amt; j++) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (Math.random() * 100 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }

    let itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    return {
      name: "Mystery Chest!", value: `You open up the chest.
You got...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}
You also got ${brackets(commanum(cyclesGot.toString()))} cycles!`
    };
  }
};