import * as fs from "fs";
import * as path from "path";
import admin from "firebase-admin";

if (process.env.FIREBASE) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE))
  });
} else {
  const serviceAccount: admin.ServiceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../sdk-key.json"), "utf8")); // i couldn't think of a better way lol

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export * from "./genschema";
export * from "./pseudo";