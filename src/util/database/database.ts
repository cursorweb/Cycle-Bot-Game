import * as fs from "node:fs";
import { URL } from "node:url";
import admin from "firebase-admin";

if (process.env.FIREBASE) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE))
  });
} else {
  const serviceAccount: admin.ServiceAccount = JSON.parse(fs.readFileSync(new URL("../../../sdk-key.json", import.meta.url), "utf8")); // i couldn't think of a better way lol

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export * from "./genschema.js";
export * from "./pseudo.js";
export * from "./boosts.js";