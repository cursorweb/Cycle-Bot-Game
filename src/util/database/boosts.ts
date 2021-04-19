// 'boost' db
export type BoostUser = {
  [i: number]: number;
};

export const bdb: { [i: string]: BoostUser } = {};

export namespace Boost {
  export function setUser(key: string, val: BoostUser) {
    if (!bdb[key]) bdb[key] = val;
    Object.assign(bdb[key], val);
  }

  export function getUser(key: string) {
    return bdb[key];
  }
}