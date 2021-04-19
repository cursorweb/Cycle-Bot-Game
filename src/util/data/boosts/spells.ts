import { BoostEnum } from "./boosts";

export interface SpellItm {
  success: number;
  drops: BoostEnum;
}

export const spells: SpellItm[] = [{
  success: 50,
  drops: BoostEnum.Coinflip
}, {
  success: 5,
  drops: BoostEnum.SOQues
}, {
  success: 80,
  drops: BoostEnum.FriendDM
}, {
  success: 25,
  drops: BoostEnum.GambleFever
}];