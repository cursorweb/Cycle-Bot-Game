import { msBetween } from "../../global";

/**
 * An 'array' containing the boosts data.
 * i: the id of the boost
 * data: the data, it contains a time of creation and the amount to stack.
 */
export type BoostArr = {
  /**
   * Boosts last for 1 minute.
   */
  [i: number]: Date[]
}

export const bdb: { [i: string]: BoostArr } = {};

export namespace Boost {
  export function setUser(key: string, val: BoostArr) {
    if (!bdb[key]) bdb[key] = val;
    Object.assign(bdb[key], val);
  }

  export function getUser(key: string) {
    if (!bdb[key]) bdb[key] = {};
    else checkUser(key);
    return bdb[key];
  }

  export function checkUser(key: string) {
    const user = bdb[key];
    for (const boostKey in user) {
      const boost = user[boostKey];
      for (const time of boost) {
        // 1 minute
        if (msBetween(time, new Date()) > 6e4) delete user[boostKey];
      }
    }
  }
}