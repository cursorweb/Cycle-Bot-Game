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
  dropChance: 20
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
}];