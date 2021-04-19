export interface BoostItm {
  name: string;
  description: string;
  /**
   * The message when the user interacts with it (optional for tpm)
   */
  message?: string;

  // 0-100
  tpc?: number;
  cpp?: number;
  tpm?: number;
}

export enum BoostEnum {
  Coinflip,
  SOQues,
  FriendDM,
  GambleFever
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
  name: "Gombling Fever",
  description: "It's cheap, and the rewards are high!",
  message: "This isn't helping with your addiction...",

  tpc: 25,
  cpp: 25,
  tpm: 25
}];