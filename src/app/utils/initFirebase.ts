import firebaseAdmin from "firebase-admin";

export const initFirebase = (): void => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIRESTORE_PROJECT_ID,
      clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
      privateKey: process.env.FIRESTORE_PRIVATE_KEY,
    }),
    databaseURL: `https://${process.env.FIRESTORE_PROJECT_ID}.firebaseio.com`,
  });
};
