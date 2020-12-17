import { db } from "./database";

import * as fs from "fs/promises"; // todo: remove
import * as path from "path"; // todo: remove

import { CycleUser } from "./genschema";
// todo: literally add everything xd
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

export function getUser(key: string): CycleUser {
  return pdb[key];
}

export async function save() {
  db.collection("cycle-users").doc("users").set(pdb);
}

export async function update() {
  let col = db.collection("cycle-users").doc("users");
  col.get().then(doc => {
    pdb = doc.data() as { [i: string]: CycleUser };
  });
  pdb = JSON.parse(await fs.readFile(path.join(__dirname, "..", "..", "..", "database.json"), "utf-8"));
}