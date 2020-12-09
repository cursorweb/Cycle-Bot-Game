// the S stands for Shop
export interface SItem {
  name: string;
  description: string;

  cost: number; // in cycles

  tpc?: number;
  cpp?: number;
  tpm?: number;
}

// upgrades are cpp, idles are tpm
export const items: { upgrade: SItem[], idle: SItem[] } = {
  upgrade: [{
    name: "Inspiration",
    description: "The idea is the start of everything!",
    cost: 10,
    tpc: 1
  }, {
    name: "Typing.com",
    description: "Time to learn to type!",
    cost: 15,
    tpc: 5
  }, {
    name: "NotePad++",
    description: "A featureless editor",
    cost: 25,
    tpc: 10
  }, {
    name: "Pastebin",
    description: "Nowhere else to host",
    cost: 40,
    tpc: 15
  }, {
    name: "Hastebin",
    description: "It's pastebin but with an H!",
    cost: 75,
    tpc: 25
  }],
  
  idle: [{
    name: "First Idle",
    description: "Your very first idle machine!",
    cost: 100
  }]
};