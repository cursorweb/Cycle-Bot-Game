// 'boost' db
export interface BoostData {
  /**
   * Boosts last for 1 minute.
   */
  created: Date;
  amt: number;
}

/**
 * An 'array' containing the boosts data.
 * i: the id of the boost
 * data: the data, it contains a time of creation and the amount to stack.
 */
export type BoostArr = {
  [i: number]: BoostData
}

export const bdb: { [i: string]: BoostArr } = {};

export namespace Boost {
  export function setUser(key: string, val: BoostArr) {
    if (!bdb[key]) bdb[key] = val;
    Object.assign(bdb[key], val);
  }

  export function getUser(key: string) {
    return bdb[key];
  }
}