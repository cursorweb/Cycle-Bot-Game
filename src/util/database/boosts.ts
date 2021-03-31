import { BoostItm } from "./genschema";

// 'boost' db
export const bdb: { [i: string]: BoostItm[] } = {};

export namespace Boost {
  export function setUser(key: string, val: BoostItm[]) {
    if (!bdb[key]) bdb[key] = val;
    Object.assign(bdb[key], val);
  }

  export function getUser(key: string) {
    return bdb[key];
  }
}