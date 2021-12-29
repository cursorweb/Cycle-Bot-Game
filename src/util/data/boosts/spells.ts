import { BoostEnum } from "./boosts.js";

export interface SpellItm {
  success: number;
  drops: BoostEnum;
}
/**
 * Every spell is actually a pointer to a boost, so nothing new there!
 * To get meta, we will need to follow the pointer, but that shouldn't be too slow.
 */
export const spells: SpellItm[] = [{
  success: 50,
  drops: BoostEnum.Coinflip
}, {
  success: 10,
  drops: BoostEnum.SOQues
}, {
  success: 80,
  drops: BoostEnum.FriendDM
}, {
  success: 25,
  drops: BoostEnum.GambleFever
}, {
  success: 20,
  drops: BoostEnum.ClassicSpell
}, {
  success: 60,
  drops: BoostEnum.SpellingBee
}];