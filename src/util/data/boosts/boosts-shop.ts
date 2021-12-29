import { BoostEnum } from "./boosts.js";

// SB = Shop Boost
export interface SBItem {
  cost: number | string;
  ref: BoostEnum;
}

export const boostShop: SBItem[] = [{
  cost: 10,
  ref: BoostEnum.SugarHigh
}, {
  cost: 10,
  ref: BoostEnum.StylishShirts
}];