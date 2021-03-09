// visit ./openItem.ts for implementation
// the B stands for Boost
export interface BItem {
  name: string;
  emoji: string; // emoji id

  description: string; // description
  dropChance: number; // out of 100
  // non-openable things (like ego-coins) can't be opened, and will lack implementation.
}

export const items: BItem[] = [{
  name: "Ego-Coin",
  emoji: "", // todo
  description: "Made from only those with the biggest egoes!",
  dropChance: 25
}, {
  name: "Cheap iPhone",
  emoji: "",
  description: "The camera doesn't even work!",
  dropChance: 8
}, {
  name: "Extra Finger",
  emoji: "",
  description: "Gross... but hey, more efficiency!",
  dropChance: 15
}, {
  name: "Coffee",
  emoji: "",
  description: "Use this to code with a boost!",
  dropChance: 10
}, {
  name: "Chest Chest",
  emoji: "",
  description: "Chests may contain chests.",
  dropChance: 8
}, {
  name: "Daily Chest",
  emoji: "",
  description: "Get this item through `&d`!",
  dropChance: 0
}, {
  name: "Apple iPhone",
  emoji: "",
  description: "An iPhone... with an ego!",
  dropChance: 5
}, {
  name: "Chest Chest Chest",
  emoji: "",
  description: "A better chest!",
  dropChance: 2
}];