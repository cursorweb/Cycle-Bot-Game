// refer to ./item.ts for metadata.
import * as Discord from "discord.js";
import { Database, random, brackets, commanum, hidden, plural } from "../../global.js";
import Big from "bignumber.js";
import { items, ItemEnum } from "./item.js";

// this way, we can utilize the inefficiency of an array search.
// we will check if this object has an implementation, and if not, there won't be one!
export const openItem: { [i: number]: (user: Database.CycleUser, amt: number) => Discord.APIEmbedField } = {
  [ItemEnum.CheapPhone]: (user, amt) => {
    const cycles = new Big(user.cycles);
    const cpp = new Big(user.cpp);

    const num = cpp.plus(Math.round(random(1, 5))).times(amt);
    const newCycles = cycles.plus(num);

    user.cycles = newCycles.toString();

    return {
      name: "Text text text!",
      value: `You use your phone.
It's cheap, so it dies quickly!
+ ${brackets(commanum(num.toString()))} cycles!`
    };
  },
  [ItemEnum.ExtraFinger]: (user, amt) => {
    const text = new Big(user.text);
    const tpc = new Big(user.tpc);

    const num = tpc.plus(Math.round(random(1, 5))).times(amt);
    const newText = text.plus(num);

    user.text = newText.toString();

    return {
      name: "Code code code!",
      value: `You use your extra finger.
It's not your finger, and breaks!
+ ${brackets(commanum(num.toString()))} text!`
    };
  },
  [ItemEnum.Coffee]: (user, amt) => {
    const text = new Big(user.text);
    const tpc = new Big(user.tpc);

    const num = tpc.times((10 + amt) / 10).dp(0);
    const newText = text.plus(num);

    user.text = newText.toString();

    return {
      name: "Code code code!",
      value: `You drink some coffee.
You feel a surge of energy!
+ ${brackets(commanum(num.toString()))} text!`
    };
  },
  [ItemEnum.ChestChest]: (user, amt) => {
    const itemsGot: { [i: string]: number } = {};

    for (let j = 0; j < 2 * amt; j++) {
      for (let i = 0; i < items.length; i++) {
        if (i == ItemEnum.ChestChest || i == ItemEnum.ChestChestChest) continue;
        const item = items[i];
        if (Math.random() * 100 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }
    const itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    return {
      name: "Mystery Chest!", value: `You open up the chest.
You got...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}`
    };
  },
  [ItemEnum.DailyChest]: (user, amt) => {
    let itemsFound = 0;
    const itemsGot: { [i: string]: number } = {};
    let cycles = new Big(user.cycles);
    const cpp = new Big(user.cpp);
    const cyclesGot = cpp.times(2).times(amt);
    cycles = cycles.plus(cyclesGot);

    user.cycles = cycles.toString();

    for (let j = 0; j < 10 * amt; j++) {
      for (let i = 0; i < items.length; i++) {
        if (itemsFound > 25) break;
        if (Math.random() > 0.5) itemsFound++;

        const item = items[i];
        if (Math.random() * 100 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }

    const itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    return {
      name: "Mystery Chest!", value: `You open up the chest.
You got...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}
You also got ${brackets(commanum(cyclesGot.toString()))} cycles!`
    };
  },
  [ItemEnum.ApplePhone]: (user, amt) => {
    const cycles = new Big(user.cycles);
    const text = new Big(user.text);
    const cpp = new Big(user.cpp);
    const tpc = new Big(user.tpc);

    const num = cpp.plus(Math.round(random(1, 5))).times(amt);
    const num2 = tpc.plus(Math.round(random(1, 5))).times(amt);
    const newCycles = cycles.plus(num);
    const newText = text.plus(num2);

    user.cycles = newCycles.toString();
    user.text = newText.toString();

    return {
      name: "Text text text!",
      value: `You use your *expensive* phone.
It's apple, so it dies quickly!
+ ${brackets(commanum(num.toString()))} cycles!
+ ${brackets(commanum(num2.toString()))} text!`
    };
  },
  [ItemEnum.ChestChestChest]: (user, amt) => {
    const itemsGot: { [i: string]: number } = {};

    for (let j = 0; j < 25 * amt; j++) {
      for (let i = 0; i < items.length; i++) {
        if (i == ItemEnum.ChestChest || i == ItemEnum.ChestChestChest) continue;
        const item = items[i];
        if (Math.random() * 150 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }

    user.inv[ItemEnum.ChestChest] = new Big(user.inv[ItemEnum.ChestChest] || 0).plus(amt).toString();

    const itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    return {
      name: "Mystery Chest Chest!", value: `You open up the chest chest.
You got...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}
Also you got ${brackets(commanum(amt.toString()))} **chest chest${plural(amt)}**!`
    };
  },
  [ItemEnum.CraftingChest]: (user, amt) => {
    const itemsGot: { [i: string]: number } = {};
    const craftingItems = [ItemEnum.Glue, ItemEnum.SuperGlue, ItemEnum.CraftingMat];

    for (let j = 0; j < 20 * amt; j++) {
      for (const i of craftingItems) {
        const item = items[i];
        if (Math.random() * 150 < item.dropChance) {
          itemsGot[i] = (itemsGot[i] || 0) + 1;
          user.inv[i] = new Big(user.inv[i] || 0).plus(1).toString();
        }
      }
    }

    const itemText = Object.keys(itemsGot).map(i => `${hidden(`${items[Number(i)].name}`)}${itemsGot[i] > 1 ? ` x**${commanum(itemsGot[i].toString())}**` : ""}`);

    return {
      name: "Mystery Chest!", value: `You open up the crafting chest.
You got...
${itemText.length == 0 ? hidden("nothing :(") : itemText.join("\n")}`
    };
  },
  [ItemEnum.KnowledgeBook]: (user, amt) => {
    let xp = new Big(user.xp);
    const level = new Big(user.level);
    const xpAmt = level.plus(12 * amt);
    xp = xp.plus(amt);
    user.xp = xp.toString();

    return {
      name: "Book of knowledge!", value: `You read the book...
You instantly gain SMORT!
+ ${brackets(commanum(xpAmt.toString()))} XP!

**Note: ** Use \`&c\` to level up!`
    };
  },
  [ItemEnum.EgoCoinMaker]: (user, amt) => {
    // every ego coin is worth 20
    let cycles = new Big(user.cycles);
    const cycleUsed = cycles.times(0.05 * amt).dp(0);

    let egoCoins = new Big(user.inv[ItemEnum.EgoCoin]);
    const egoCoinAmt = cycleUsed.div(2).dp(0);

    if (cycles.lt(cycleUsed) || Math.random() * 50 < amt) {
      return {
        name: "Boom!",
        value: "With a crash, the ego-coin maker breaks.\nSometimes it does this, no machine is perfect!"
      };
    }

    cycles = cycles.minus(cycleUsed);
    egoCoins = egoCoins.plus(egoCoinAmt);

    user.cycles = cycles.toString();
    user.inv[ItemEnum.EgoCoin] = egoCoins.toString();

    return {
      name: "Ego Coin Maker!",
      value: `You use the machine, and you got...
+${brackets(commanum(egoCoinAmt.toString()))} Ego-Coins!
-${brackets(commanum(cycleUsed.toString()))} Cycles!

You now have ${brackets(commanum(egoCoins.toString()))} ego-coins!
You now have ${brackets(commanum(user.cycles.toString()))} cycles!`
    };
  },
  [ItemEnum.GoldenCycleMaker]: (user, amt) => {
    let cycles = new Big(user.cycles);
    const cycleUsed = cycles.times(0.05 * amt).dp(0);

    let goldenCycles = new Big(user.inv[ItemEnum.GoldenCycle]);
    const goldenCycleAmt = cycleUsed.div(2).dp(0);

    if (cycles.lt(cycleUsed) || Math.random() * 50 < amt) {
      return {
        name: "Boom!",
        value: "With a crash, the golden-cycle maker breaks.\nSometimes it does this, no machine is perfect!"
      };
    }

    cycles = cycles.minus(cycleUsed);
    goldenCycles = goldenCycles.plus(goldenCycleAmt);

    user.cycles = cycles.toString();
    user.inv[ItemEnum.GoldenCycle] = goldenCycles.toString();

    return {
      name: "Golden Cycle Maker!",
      value: `You use the machine, and you got...
+${brackets(commanum(goldenCycleAmt.toString()))} Golden Cycles!
-${brackets(commanum(cycleUsed.toString()))} Cycles!

You now have ${brackets(commanum(goldenCycles.toString()))} golden cycles!
You now have ${brackets(commanum(user.cycles.toString()))} cycles!`
    };
  },
  [ItemEnum.VoteCrate]: (user, amt) => {
    const text = new Big(user.text);
    const cycles = new Big(user.cycles);
    const tpc = new Big(user.tpc);
    const cpp = new Big(user.cpp);

    const txt = tpc.times(amt / 1.5).dp(0);
    const newText = text.plus(txt);

    const cycl = cpp.times(amt / 1.5).dp(0);
    const newCycles = cycles.plus(cycl);

    user.text = newText.toString();
    user.cycles = newCycles.toString();

    return {
      name: "Vote Crate!",
      value: `You open the vote crate.
+ ${brackets(commanum(txt.toString()))} text!
+ ${brackets(commanum(cycl.toString()))} cycles!

Thanks for voting!`
    };
  },
  [ItemEnum.BronzeQuestChest]: (user, amt) => {
    // 1% tpm * cpp -> cycle
    // 10 ego coins
    // 1 chest chest

    const cyclesEarned = new Big(user.tpm).times(0.01 * amt).times(new Big(user.cpp)).plus(500 * amt).dp(0, Big.ROUND_FLOOR);
    const ecsEarned = 10 * amt;
    const cchestsEarned = amt;

    const nCycles = new Big(user.cycles).plus(cyclesEarned).toString();
    const ecs = new Big(user.inv[ItemEnum.EgoCoin]).plus(ecsEarned).toString();
    const cchests = new Big(user.inv[ItemEnum.ChestChest]).plus(cchestsEarned).toString();

    user.cycles = nCycles;
    user.inv[ItemEnum.EgoCoin] = ecs;
    user.inv[ItemEnum.ChestChest] = cchests;

    return {
      name: "Bronze Quest Chest!",
      value: `You open up a ${brackets("Bronze quest chest")}!
You got:
+ ${brackets(cyclesEarned.toString())} Cycles!
+ ${brackets(ecsEarned.toString())} Ego-Coins!
+ ${brackets(cchestsEarned.toString())} Chest Chests!`
    };
  },
  [ItemEnum.SilverQuestChest]: (user, amt) => {
    // 5% tpm * cpp -> cycle
    // 20 ego coins
    // 10 chest chest

    const cyclesEarned = new Big(user.tpm).times(0.05 * amt).times(new Big(user.cpp)).plus(5e4 * amt).dp(0, Big.ROUND_FLOOR);
    const ecsEarned = 20 * amt;
    const cchestsEarned = 10 * amt;

    const nCycles = new Big(user.cycles).plus(cyclesEarned).toString();
    const ecs = new Big(user.inv[ItemEnum.EgoCoin]).plus(ecsEarned).toString();
    const cchests = new Big(user.inv[ItemEnum.ChestChest]).plus(cchestsEarned).toString();

    user.cycles = nCycles;
    user.inv[ItemEnum.EgoCoin] = ecs;
    user.inv[ItemEnum.ChestChest] = cchests;

    return {
      name: "Silver Quest Chest!",
      value: `You open up a ${brackets("Silver quest chest")}!
You got:
+ ${brackets(cyclesEarned.toString())} Cycles!
+ ${brackets(ecsEarned.toString())} Ego-Coins!
+ ${brackets(cchestsEarned.toString())} Chest Chests!`
    };
  },
  [ItemEnum.GoldQuestChest]: (user, amt) => {
    // 10% tpm * cpp -> cycle
    // 30 ego coins
    // 15 chest chest
    // 1 chest chest chest

    const cyclesEarned = new Big(user.tpm).times(0.1 * amt).times(new Big(user.cpp)).plus(5e5 * amt).dp(0, Big.ROUND_FLOOR);
    const ecsEarned = 30 * amt;
    const cchestsEarned = 15 * amt;
    const ccchestsEarned = amt;

    const nCycles = new Big(user.cycles).plus(cyclesEarned).toString();
    const ecs = new Big(user.inv[ItemEnum.EgoCoin]).plus(ecsEarned).toString();
    const cchests = new Big(user.inv[ItemEnum.ChestChest]).plus(cchestsEarned).toString();
    const ccchests = new Big(user.inv[ItemEnum.ChestChestChest]).plus(ccchestsEarned).toString();

    user.cycles = nCycles;
    user.inv[ItemEnum.EgoCoin] = ecs;
    user.inv[ItemEnum.ChestChest] = cchests;
    user.inv[ItemEnum.ChestChestChest] = ccchests;

    return {
      name: "Gold Quest Chest!",
      value: `You open up a ${brackets("Gold quest chest")}!
You got:
+ ${brackets(cyclesEarned.toString())} Cycles!
+ ${brackets(ecsEarned.toString())} Ego-Coins!
+ ${brackets(cchestsEarned.toString())} Chest Chests!
+ ${brackets(ccchestsEarned.toString())} Chest Chest Chests!`
    };
  }
};