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
export const items: { upgrades: SItem[], cpp: SItem[], idle: SItem[] } = {
  upgrades: [{
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
  }, {
    name: "NullPointerException",
    description: "Segmentation fault (core dumped)",
    cost: 390634,
    tpc: 120
  }, {
    name: "Stack Overflow",
    description: "To understand recursion, you must first understand recursion.",
    cost: 9766e3,
    tpc: 150
  }, {
    name: "Stack Overflow II",
    description: "That place where you ask questions",
    cost: 2087e6,
    tpc: 200
  }, {
    name: "Hoisting",
    description: "Use it before you define it!",
    cost: "446169698830",
    tpc: 250
  }],
  
  cpp: [{
    name: "Popular",
    description: "You are now slightly popular.",
    cost: 10,
    cpp: 1
  }, {
    name: "Meme",
    description: "Haha funnies",
    cost: 40,
    cpp: 5
  }, {
    name: "Friends",
    description: "bff",
    cost: 1100,
    cpp: 10
  }],

  idle: [{
    name: "Idle Machine",
    description: "Your first idle!",
    cost: 5,
    tpm: 1
  }, {
    name: "Code Robot",
    description: "Please click all the bugs to continue.",
    cost: 21,
    tpm: 5
  }, {
    name: "StackOverflow Commitee",
    description: "Free code review!",
    cost: 41,
    tpm: 10
  }, {
    name: "Intern",
    description: "Free code!",
    cost: 61,
    tpm: 15
  }, {
    name: "Code AI",
    description: "One day it'll write binary",
    cost: 81,
    tpm: 20
  }]
};