export interface BoostItm {
  name: string;
  description: string;
  success: number;

  tpc?: string | number;
  cpp?: string | number;
  tpm?: string | number;
}

export namespace BoostEnum {
  export enum Boost {

  }

  export enum Spell {
    Coinflip,
    SOQues,
    FriendDM,
    GambleFever
  }
}

export const boosts: BoostItm[] = [];
export const spells: BoostItm[] = [{
  name: "Coinflip",
  description: "Flip a coin... see the result!",
  success: 50
}, {
  name: "Stackoverflow Question",
  description: "This can either end really well or really badly...",
  success: 75
}, {
  name: "DM to friends",
  description: "You might get ignored...",
  success: 80
}, {
  name: "Gombling Fever",
  description: "It's cheap, and the rewards are high!",
  success: 10
}];