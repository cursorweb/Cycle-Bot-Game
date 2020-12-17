// the S stands for Shop
export interface SItem {
  name: string;
  description: string;

  cost: number | string; // in cycles

  tpc?: number | string;
  cpp?: number | string;
  tpm?: number | string;
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
    name: "NotePad",
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
    cost: 135,
    tpc: 45
  }, {
    name: "NotePad++",
    description: "It's evolution! Still featureless...",
    cost: 223,
    tpc: 50
  }, {
    name: "SourceB.in",
    description: "Another bin?!?",
    cost: 375,
    tpc: 55
  }, {
    name: "Whitespace",
    description: "[ ] [\t]",
    cost: 1837,
    tpc: 70
  }, {
    name: "Indentation Error",
    description: "Did you use four spaces?!?",
    cost: 5353,
    tpc: 80
  }, {
    name: "Windows Powershell",
    description: "At least `clear` works",
    cost: 45697,
    tpc: 100
  }],
  
  idle: [{
    name: "First Idle",
    description: "Your very first idle machine!",
    cost: 100
  }]
};