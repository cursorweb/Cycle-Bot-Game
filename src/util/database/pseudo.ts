import { promises as fs } from "fs";
import { BigNumber as Big } from "bignumber.js";
import { msBetween } from "../util";
import * as path from "path";

import { db } from "./database";

import { CycleUser } from "./genschema";
// Try to use `setUser` for everything

// 'pseudo' db
export let pdb: { [i: string]: CycleUser } = {};

export function setUser(key: string, val: CycleUser) {
  if (!pdb[key]) pdb[key] = val;
  Object.assign(pdb[key], val);
}

// return keys of IDs
export function findUser(filter: (u: CycleUser) => boolean): string[] {
  return Object.keys(pdb).filter(k => filter(pdb[k]));
}

export function getUser(key: string) {
  return pdb[key];
}

export function pruneUsers() {
  for (const key in pdb) {
    const user = pdb[key];

    // greater than a week
    if (new Big(user.cycles).lt(50) && (!user.daily || msBetween(new Date(user.daily), new Date()) > 1000 * 60 * 60 * 24 * 7)) {
      delete pdb[key];
    }
  }
}

export async function save() {
  if (Object.keys(pdb).length == 0) return; // prevent corruption
  return await db.collection("cycle-users").doc("users").set(pdb);
}

export async function update() {
  const col = db.collection("cycle-users").doc("users");
  return await col.get().then(doc => {
    pdb = doc.data() as { [i: string]: CycleUser };
  });
}

export async function saveBackup() {
  await fs.writeFile(path.join(__dirname, "..", "..", "..", "database.json"), JSON.stringify(pdb));
}

export async function updateBackup() {
  pdb = JSON.parse(await fs.readFile(path.join(__dirname, "..", "..", "..", "database.json"), "utf-8"));
}