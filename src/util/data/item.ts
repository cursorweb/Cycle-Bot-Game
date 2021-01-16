// visit ./openItem.ts for implementation
// visit ./drops.ts for probabilities
// the B stands for Boost
export interface BItem {
  name: string;
  emoji: string; // emoji id

  description: string; // description
  // non-openable things (like ego-coins) can't be opened.
}

export const items: BItem[] = [{
  name: "Ego-Coin",
  emoji: "", // todo
  description: "Made from only those with the biggest egoes!",
}];