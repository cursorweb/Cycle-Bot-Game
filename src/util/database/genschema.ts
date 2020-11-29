import * as Discord from "discord.js"

function genSchema(user: Discord.User): CycleUser {
  return {
    name: user.tag,

    money: "0",
    cycles: "0",
    text: "0",
    egocoins: "0",

    tpc: "1",
    cpp: "1",
    cpm: "0",

    langs: [],
    level: "0",
    socialMedia: [],

    inv: [],
    bought: []
  }
}

interface CycleUser {
  // meta
  name: string, // tag, used for identification

  // leaderboard
  money: string,
  cycles: string, // used from big.js
  text: string, // your code
  egocoins: string,

  // boosts
  tpc: string, // text per code
  cpp: string, // cycles per post
  cpm: string, // cycles per minute

  // extra boosts
  langs: string[], // languages the user knows (boost)
  level: string, // level boost
  socialMedia: string[], // social media boost

  // todo section
  inv: string[], // what the user has in inventory
  bought: [], // what the user has bought
}

export { genSchema, CycleUser };