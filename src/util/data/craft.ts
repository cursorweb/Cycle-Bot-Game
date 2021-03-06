export interface CraftItem {
  /**
   * The message when crafted
   */
  message: string;
  creates: number;
  requires: { amt: number | string, type: number }[];
};

export let items: CraftItem[] = [{
  message: "You smash all the ego-coins together!",
  creates: 6,
  requires: [{ amt: 2, type: 1 }, { amt: 5, type: 0 }]
}];