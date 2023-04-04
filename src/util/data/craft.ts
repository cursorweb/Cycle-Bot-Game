import { ItemEnum } from "./item.js";

export interface CraftItem {
  /**
   * The message when crafted
   */
  message: string;
  creates: number;
  requires: { amt: number | string, type: number }[];
}

export const craftItems: CraftItem[] = [{
  message: "You smash all the idle-coins together with the cheap iPhone!",
  creates: ItemEnum.ApplePhone,
  requires: [{ amt: 1, type: ItemEnum.CheapPhone }, { amt: 5, type: ItemEnum.IdleCoin }]
}, {
  message: "You glue the chest chests together...",
  creates: ItemEnum.ChestChestChest,
  requires: [{ amt: 5, type: ItemEnum.ChestChest }, { amt: 5, type: ItemEnum.Glue }]
}, {
  message: "You glue glue together... what?",
  creates: ItemEnum.SuperGlue,
  requires: [{ amt: 2, type: ItemEnum.Glue }]
}, {
  message: "You glue the crafting materials together...",
  creates: ItemEnum.ChestChest,
  requires: [{ amt: 3, type: ItemEnum.CraftingMat }, { amt: 1, type: ItemEnum.SuperGlue }]
}, {
  message: "You ruin a phone :(",
  creates: ItemEnum.CraftingMat,
  requires: [{ amt: 1, type: ItemEnum.Glue }, { amt: 1, type: ItemEnum.CheapPhone }]
}, {
  message: "You combine the golden cycles together! Somehow this makes idle-coins?",
  creates: ItemEnum.IdleCoinMaker,
  requires: [{ amt: 5, type: ItemEnum.GoldenCycle }, { amt: 5, type: ItemEnum.CraftingMat }]
}, {
  message: "You combine the idle-coins together! Somehow this makes golden cycles?",
  creates: ItemEnum.GoldenCycleMaker,
  requires: [{ amt: 5, type: ItemEnum.IdleCoin }, { amt: 5, type: ItemEnum.CraftingMat }]
}];