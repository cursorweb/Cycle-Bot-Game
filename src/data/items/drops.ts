import * as Discord from "discord.js";
import Big from "bignumber.js";
import { brackets, pluralb, commanum, hidden, Database } from "../../global.js";
import { items } from "./item.js";
import { ActionType, checkQuest } from "../quests.js";

const code: DropItem[] = [{
  chance: () => Math.random() < 0.1,
  award: user => {
    let text = new Big(user.text);
    const tpc = new Big(user.tpc);
    const boost = Math.random() * 2;
    const amount = tpc.times(boost).dp(0);
    text = text.plus(amount);
    user.text = text.toString();
    return {
      name: "Code Burst!", value: `You get an extra burst of energy!
+${brackets(commanum(amount.toString()))} line${pluralb(amount)} of code! (+${Math.floor(boost * 100)}%)`
    };
  }
}, {
  chance: () => Math.random() < 0.05,
  award: user => {
    let cycles = new Big(user.cycles);
    cycles = cycles.plus(5);
    user.cycles = cycles.toString();

    const field = checkQuest(user, ActionType.Answer);
    let value = "";
    if (field) {
      value = `
**${field.name}**
${field.value}`;
    }

    return {
      name: "Question Answerer!", value: `You answered somebody's question!
You earned ${brackets("5")} cycles!${value}`
    };
  }
}, {
  chance: () => Math.random() < 0.2,
  award: user => {
    let itemsFound = 0;
    const itemsGot: { [i: string]: number } = {};

    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < items.length; i++) {
        if (itemsFound > 15) break;
        if (Math.random() > 0.5) itemsFound++;

        const item = items[i];
        if (Math.random() * 100 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }

    const itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    const field = checkQuest(user, ActionType.Chest);
    let value = "";
    if (field) {
      value = `
**${field.name}**
${field.value}`;
    }

    return {
      name: "Mystery Chest!", value: `You accidentally make a ${brackets("chest")}!
You open it up and find...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}${value}`
    };
  }
}];

// ----

const post: DropItem[] = [{
  chance: () => Math.random() < 0.05,
  award: user => {
    let text = new Big(user.text);
    const tpc = new Big(user.tpc);
    const boost = Math.floor(Number(Math.random() * 10));
    const amount = tpc.times(boost).dp(0);
    text = text.plus(amount);
    user.text = text.toString();
    return { name: "User Suggestions", value: `People give you suggestions, and you write ${brackets(commanum(amount.toString()))} line${pluralb(amount)} of code!` };
  }
}];

export interface DropItem {
  chance: () => boolean;
  award: (_: Database.CycleUser) => Discord.APIEmbedField
}

export { code, post };