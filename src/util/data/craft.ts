import { ItemEnum } from "./item";

export interface CraftItem {
  /**
   * The message when crafted
   */
  message: string;
  creates: number;
  requires: { amt: number | string, type: number }[];
};

export let craftItems: CraftItem[] = [{
  message: "You smash all the ego-coins together with the cheap iPhone!",
  creates: ItemEnum.ApplePhone,
  requires: [{ amt: 2, type: ItemEnum.CheapPhone }, { amt: 5, type: ItemEnum.EgoCoin }]
}, {
  message: "You glue 5 chest chests together...",
  creates: ItemEnum.ChestChestChest,
  requires: [{ amt: 5, type: ItemEnum.ChestChest }, { amt: 5, type: ItemEnum.Glue }]
}, {
  message: "You glue glue together... what?",
  creates: ItemEnum.SuperGlue,
  requires: [{ amt: 4, type: ItemEnum.Glue }]
}, {
  message: "You glue the crafting materials together...",
  creates: ItemEnum.CraftingMat,
  requires: [{ amt: 6, type: ItemEnum.CraftingMat }, { amt: 4, type: ItemEnum.SuperGlue }]
}];