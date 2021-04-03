// 'boost' db
export const bdb: { [i: string]: number[] } = {};

export namespace Boost {
  export function setUser(key: string, val: number[]) {
    if (!bdb[key]) bdb[key] = val;
    Object.assign(bdb[key], val);
  }

  export function getUser(key: string) {
    return bdb[key];
  }
}