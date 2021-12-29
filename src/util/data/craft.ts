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
  message: "You smash all the ego-coins together with the cheap iPhone!",
  creates: ItemEnum.ApplePhone,
  requires: [{ amt: 1, type: ItemEnum.CheapPhone }, { amt: 5, type: ItemEnum.EgoCoin }]
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
  message: "You ruin a chest chest :(",
  creates: ItemEnum.CraftingMat,
  requires: [{ amt: 1, type: ItemEnum.Glue }, { amt: 1, type: ItemEnum.ChestChest }]
}, {
  message: "You combine the ego-coins together!",
  creates: ItemEnum.EgoCoinMaker,
  requires: [{ amt: 5, type: ItemEnum.EgoCoin }, { amt: 5, type: ItemEnum.CraftingMat }]
}, {
  message: "You combine the golden cycles together!",
  creates: ItemEnum.GoldenCycleMaker,
  requires: [{ amt: 5, type: ItemEnum.GoldenCycle }, { amt: 5, type: ItemEnum.CraftingMat }]
}];