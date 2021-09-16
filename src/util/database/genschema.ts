import * as Discord from "discord.js";

export const defaultSchema: CycleUser = {
  name: "",
  cycles: "0", text: "0", xp: "0",
  tpc: "1", cpp: "1", tpm: "0",
  langs: null, level: "1", socialMedia: 0,

  inv: {}, badges: [],

  daily: "",

  bought: {
    idle: {},
    upgrades: {},
    cpp: {}
  }
};

export function genSchema(user: Discord.User): CycleUser {
  return {
    name: user.tag,
    cycles: "0", text: "0", xp: "0",
    tpc: "1", cpp: "1", tpm: "0",
    langs: null, level: "1", socialMedia: 0,

    inv: {}, badges: [],

    daily: "",

    bought: {
      idle: {},
      upgrades: {},
      cpp: {}
    }
  };
}

export interface CycleUser {
  // meta
  name: string; // tag, used for identification

  // leaderboard
  cycles: string; // used from big.js
  text: string; // your code
  xp: string; // xp points
  // refer to desmos.
  // gain EXP by POSTING

  // boosts
  tpc: string; // text per code
  cpp: string; // cycles per post
  tpm: string; // text per minute

  // extra boosts
  langs: number | null; // language the user knows (boost index)
  level: string; // the level
  socialMedia: number; // social media platform (number)
  inv: { [i: number]: string }; // [item-index]: amount

  badges: string[]; // badges lol

  daily: string;

  // what the user has bought
  bought: {
    idle: { [i: number]: number }; // [item-index]: amount
    // this means we can only expand forwards
    upgrades: { [i: number]: number };
    cpp: { [i: number]: number };
  }
}