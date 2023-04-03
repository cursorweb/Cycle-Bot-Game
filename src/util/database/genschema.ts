import * as Discord from "discord.js";

export const defaultSchema: CycleUser = {
  name: "",
  cycles: "0", text: "0", xp: "0",
  tpc: "1", cpp: "1", tpm: "0",
  level: "1", socialMedia: 0,

  inv: {}, badges: [],

  daily: "",
  quest: null,

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
    level: "1", socialMedia: 0,

    inv: {}, badges: [],

    daily: "",
    quest: null,

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
  level: string; // the level
  socialMedia: number; // social media platform (number)
  inv: { [i: number]: string | undefined }; // [item-index]: amount

  badges: string[]; // badges lol

  daily: string;

  quest: {
    name: number, // quest enum
    end: string,
    difficulty: number, // 0 = easy, 1 = med, 2 = hard
    progress: number
  } | null;

  // what the user has bought
  bought: {
    idle: { [i: number]: number | undefined }; // [item-index]: amount
    // this means we can only expand forwards
    upgrades: { [i: number]: number | undefined };
    cpp: { [i: number]: number | undefined };
  }
}