import * as firebaseAdmin from "firebase-admin";

import firebaseServiceAccountKey from "../../../firebaseServiceAccountKey.json";

if (typeof window !== "undefined" && !firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      firebaseServiceAccountKey as firebaseAdmin.ServiceAccount
    ),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export { firebaseAdmin };
