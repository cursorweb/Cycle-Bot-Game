import Big from "bignumber.js";
import { APIEmbedField } from "discord.js";
import { Database, brackets, addMs, random, progress } from "../../global.js";
import { ItemEnum } from "./items/item.js";

export const qDiff = ["easy", "medium", "hard"];

// you invest an amount into a quest
// and you have x hours to complete the quest!
// you then get a quest chest: bronze, silver, gold
export enum QuestName {
  Fail,
  Multiple,
  Cycles,
  Betting,
  Coding,
  Answerer,
  ChestOpener,
  Trivia,
}

// the C stands for challenge
export interface CQuest {
  name: string;
  description: string;
  max: number;
}

export const quests: CQuest[] = [{
  name: "Failed Quest",
  description: "You failed a quest lol",
  max: 1
}, {
  name: "Multitasking",
  description: "Get cycles and text!",
  max: 256
}, {
  name: "Cycle Farming",
  description: "Get cycles!",
  max: 128
}, {
  name: "Betting",
  description: "Win in Casinos!",
  max: 43 // 128 / 3
}, {
  name: "Coding",
  description: "Write some code!",
  max: 128
}, {
  name: "Helpful",
  description: "Answer some questions while coding!",
  max: 5 // 128 * 0.05
}, {
  name: "Lucky",
  description: "Get some chests while coding!",
  max: 7 // 128 * 0.1
}, {
  name: "Smart",
  description: "Participate in some trivia!",
  max: 10
}];

export enum ActionType {
  Code,
  Post,
  Answer,
  Bet,
  Chest,
  Trivia
}

export function checkQuest(user: Database.CycleUser, action?: ActionType): APIEmbedField | undefined {
  const quest = user.quest;

  if (!quest) {
    return;
  }

  if (new Date().getTime() > new Date(quest.end).getTime()) {
    if (user.quest?.name == QuestName.Fail) {
      user.quest = null;

      return {
        name: "Quest update!",
        value: `Your cooldown has ended.
You can start quests again!`
      };
    }

    const deadline = addMs(new Date(), 1000 * 60 * 60 * 24);

    user.quest = {
      name: QuestName.Fail,
      end: deadline.toString(),
      difficulty: 0,
      progress: 0
    };

    return {
      name: "Quest Failed!",
      value: `You failed your quest ${brackets(quests[quest.name].name)}!
You can't get another quest for 24 hours!`
    };
  }

  const start = quest.progress;
  switch (quest.name) {
    case QuestName.Fail:
      return;
    case QuestName.Multiple:
      if (action == ActionType.Code || action == ActionType.Post) {
        quest.progress++;
      }
      break;
    case QuestName.Cycles:
      if (action == ActionType.Post) {
        quest.progress += Math.round(random(1, 3));
      }
      break;
    case QuestName.Betting:
      if (action == ActionType.Bet) {
        quest.progress++;
      }
      break;
    case QuestName.Coding:
      if (action == ActionType.Code) {
        quest.progress++;
      }
      break;
    case QuestName.Answerer:
      if (action == ActionType.Answer) {
        quest.progress++;
      }
      break;
    case QuestName.ChestOpener:
      if (action == ActionType.Chest) {
        quest.progress++;
      }
      break;
    case QuestName.Trivia:
      if (action == ActionType.Trivia) {
        quest.progress++;
      }
      break;
  }

  const amt = quest.progress;
  const max = quests[quest.name].max;

  if (quest.progress >= max) {
    const diffs = ["Easy", "Medium", "Hard"];
    const chests = ["Bronze", "Silver", "Gold"];
    const enums = [ItemEnum.BronzeQuestChest, ItemEnum.SilverQuestChest, ItemEnum.GoldQuestChest];
    const diff = quest.difficulty;

    const name = enums[diff];
    const items = new Big(user.inv[name] || "0");
    user.inv[name] = items.plus(1).toString();

    user.quest = null;

    return {
      name: "Quest Complete!",
      value: `Because you chose a ${diffs[diff]} quest,
you get a ${brackets(`${chests[diff]} Quest Chest`)}!`
    };
  }

  if (amt != start) {
    return {
      name: "Quest Progress!",
      value: `Your progress has increased!
${progress(amt / max * 10, 10)} (${amt.toLocaleString()} / ${max.toLocaleString()})`
    };
  }
}