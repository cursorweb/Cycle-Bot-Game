import { ItemEnum } from "./item";

export interface CraftItem {
  /**
   * The message when crafted
   */
  message: string;
  creates: number;
  requires: { amt: number | string, type: number }[];
};

export let items: CraftItem[] = [{
  message: "You smash all the ego-coins together with the cheap iPhone!",
  creates: ItemEnum.ApplePhone,
  requires: [{ amt: 2, type: ItemEnum.CheapPhone }, { amt: 5, type: ItemEnum.EgoCoin }]
}];