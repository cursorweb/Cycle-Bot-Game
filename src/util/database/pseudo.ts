import fs from "node:fs/promises";
import { URL } from "node:url";

import Big from "bignumber.js";
import { msBetween } from "../util.js";

import { db } from "./database.js";

import { CycleUser } from "./genschema.js";
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
  const deleted = [];
  for (const key in pdb) {
    const user = pdb[key];
    if (user.socialMedia > 0) continue;

    // greater than a week
    if (new Big(user.cycles).lt(50) && (!user.daily || msBetween(new Date(user.daily), new Date()) > 1000 * 60 * 60 * 24 * 7)) {
      delete pdb[key];
      deleted.push(user.name);
    }
  }

  return deleted;
}

export async function save() {
  if (Object.keys(pdb).length == 0) return; // prevent corruption
  return await db.collection("cycle-users").doc("users").set(pdb);
}

export async function update() {
  if (!process.env.NODE_ENV) {
    const col = db.collection("cycle-users").doc("users");
    return await col.get().then(doc => {
      pdb = doc.data() as { [i: string]: CycleUser };
    });
  }
}

export async function saveBackup() {
  await fs.writeFile(new URL("../../../database.json", import.meta.url), JSON.stringify(pdb, null, 2));
}

export async function updateBackup() {
  pdb = JSON.parse(await fs.readFile(new URL("../../../database.json", import.meta.url), "utf-8"));
}