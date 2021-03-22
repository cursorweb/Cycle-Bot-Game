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
    cost: 12,
    tpc: 5
  }, {
    name: "NotePad",
    description: "A featureless editor",
    cost: 16,
    tpc: 10
  }, {
    name: "Pastebin",
    description: "Nowhere else to host",
    cost: 21,
    tpc: 15
  }, {
    name: "Hastebin",
    description: "It's pastebin but with an H!",
    cost: 90,
    tpc: 45
  }, {
    name: "NotePad++",
    description: "It's evolution! Still featureless...",
    cost: 115,
    tpc: 50
  }, {
    name: "SourceB.in",
    description: "Another bin?!?",
    cost: 146,
    tpc: 55
  }, {
    name: "Whitespace",
    description: "[ ] [\t]",
    cost: 304,
    tpc: 70
  }, {
    name: "Indentation Error",
    description: "Did you use four spaces?!?",
    cost: 495,
    tpc: 80
  }, {
    name: "Windows Powershell",
    description: "At least `clear` works",
    cost: 1315,
    tpc: 100
  }, {
    name: "NullPointerException",
    description: "Segmentation fault (core dumped)",
    cost: 3489,
    tpc: 120
  }, {
    name: "Stack Overflow",
    description: "To understand recursion, you must first understand recursion.",
    cost: 15079,
    tpc: 150
  }, {
    name: "Windows Powershell+",
    description: "The better version of Windows Powershell.",
    cost: 51065,
    tpc: 175
  }, {
    name: "Stack Overflow II",
    description: "That place where you ask questions",
    cost: 172925,
    tpc: 200
  }, {
    name: "Hoisting",
    description: "Use it before you define it!",
    cost: "1983009",
    tpc: 250
  }, {
    name: "Personal Care Robot",
    description: "You now don't have to spend time combing your hair all day!",
    cost: "9537000000000",
    tpc: 300
  }, {
    name: "Gamer Mouse",
    description: "The ultimate mouse.",
    cost: "2.274e7",
    tpc: 400
  }, {
    name: "Github account",
    description: "Don't lose any of your code!",
    cost: "3.429e10",
    tpc: 450
  }, {
    name: "Learn a new language",
    description: "Now you can share even more code!",
    cost: "3.9323e11",
    tpc: 500
  }],

  cpp: [{
    name: "Popular",
    description: "You are now slightly popular.",
    cost: 10,
    cpp: 1
  }, {
    name: "Meme",
    description: "Haha funnies",
    cost: 14,
    cpp: 5
  }, {
    name: "Friends",
    description: "bff",
    cost: 19,
    cpp: 10
  }, {
    name: "Subscribers",
    description: "A real subscriber!",
    cost: 27,
    cpp: 15
  }, {
    name: "Paparazzi",
    description: "Get in those shots!",
    cost: 38,
    cpp: 20
  }, {
    name: "Internet Stranger",
    description: "The best kind of fan!",
    cost: 76,
    cpp: 30
  }, {
    name: "Diehard Fan",
    description: "Uhh... that's too much?!",
    cost: 149,
    cpp: 40
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
  }, {
    name: "Debugger",
    description: "Isn't that just spamming prints?",
    cost: 101,
    tpm: 25
  }, {
    name: "Hacking Machine",
    description: "There is nothing you can't hack anymore.",
    cost: 121,
    tpm: 30
  }, {
    name: "Macros",
    description: "Let the code do it's job!",
    cost: 141,
    tpm: 35
  }, {
    name: "Debugger",
    description: "Now you debug all your code!",
    cost: 161,
    tpm: 40
  }, {
    name: "Fiverr worker",
    description: "I mean you payed for it...",
    cost: 181,
    tpm: 45
  }]
};
