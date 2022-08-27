// import { Database } from "../../global";

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
  Poster,
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
  max: Infinity
}, {
  name: "Multitasking",
  description: "Get cycles and text!",
  max: 100
}, {
  name: "Cycle Farming",
  description: "Get cycles!",
  max: 200
}, {
  name: "Betting",
  description: "Win in Casinos!",
  max: 10
}, {
  name: "Coding",
  description: "Write some code!",
  max: 250
}, {
  name: "Helpful",
  description: "Answer some questions while coding!",
  max: 10
}, {
  name: "Lucky",
  description: "Get some chests while coding!",
  max: 5
}];

export function increase(_id: string) {

}