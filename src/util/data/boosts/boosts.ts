export interface BoostItm {
  name: string;
  description: string;
  /**
   * The message when the user interacts with it
   */
  message: string;

  // 0-100
  tpc?: number;
  cpp?: number;
  tpm?: number;
}

export enum BoostEnum {
  Coinflip,
  SOQues,
  FriendDM,
  GambleFever,
  ClassicSpell,
  SpellingBee,
  BackfiringSpell,
  SugarHigh,
  StylishShirts
}

export const boosts: BoostItm[] = [{
  name: "Coinflip",
  description: "Flip a coin... see the result!",
  message: "You got 50% more text!",

  tpc: 50
}, {
  name: "Stackoverflow Question",
  description: "This can either end really well or really badly...",
  message: "Everyone loves your question!",

  tpc: 100,
  cpp: 100,
  tpm: 100
}, {
  name: "DM to friends",
  description: "You might get ignored...",
  message: "Your friends appreciate you!",

  cpp: 25
}, {
  name: "Gambling Fever",
  description: "It's cheap, and the rewards are high!",
  message: "This isn't helping with your addiction...",

  tpc: 25,
  cpp: 25,
  tpm: 25
}, {
  name: "Classic Spell",
  description: "Abracadabra!",
  message: "Your wizardry improves your life!",

  tpc: 75,
  cpp: 75,
  tpm: 75
}, {
  name: "Spelling Bee",
  description: "Spell, 'antidisestablishmentarianism'",
  message: "You make typos 50% less!",

  tpc: 50,
  cpp: 25,
  tpm: 25
}, {
  name: "Spell of Backfiring",
  description: "Your spell backfired!",
  message: "Bad luck hahaha",

  tpc: -50,
  cpp: -50,
  tpm: -50
}, {
  name: "Sugar High",
  description: "You get a sugar high so you code more!",
  message: "You type 250 WPM!",

  tpc: 50
}, {
  name: "Stylish Shirts",
  description: "Wear fashion for cycles!",
  message: "People are attracted by your shirt!",

  cpp: 50
}];