import * as Discord from "discord.js"

function genSchema(user: Discord.User): CycleUser {
  return {
    name: user.tag,
    money: "0", cycles: "0", text: "0", egocoins: "0",
    tpc: "1", cpp: "1", cpm: "0",
    langs: [], level: "0", socialMedia: [],
    
    inv: [],
    bought: {
      idle: [],
      upgrades: []
    }
  }
}

interface CycleUser {
  // meta
  name: string; // tag, used for identification

  // leaderboard
  money: string;
  cycles: string; // used from big.js
  text: string; // your code
  egocoins: string;

  // boosts
  tpc: string; // text per code
  cpp: string; // cycles per post
  cpm: string; // cycles per minute

  // extra boosts
  langs: number[]; // languages the user knows (boost index)
  level: string; // level boost
  socialMedia: number[]; // social media boost (index)
  inv: number[]; // what the user has in inventory (by index)

  // what the user has bought
  bought: {
    idle: number[][]; // the index, and then amount
    // for example, for [0, 1], the user bought 1 of the 0th index
    // this also means we can only expand up.
    upgrades: number[][];
  }
}

export { genSchema, CycleUser };