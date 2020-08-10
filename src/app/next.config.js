module.exports = () => {
  return {
    env: {
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      FIRESTORE_PROJECT_ID: process.env.FIRESTORE_PROJECT_ID,
      FIRESTORE_PRIVATE_KEY_ID: process.env.FIRESTORE_PRIVATE_KEY_ID,
      FIRESTORE_PRIVATE_KEY: process.env.FIRESTORE_PRIVATE_KEY,
      FIRESTORE_CLIENT_EMAIL: process.env.FIRESTORE_CLIENT_EMAIL,
      FIRESTORE_CLIENT_ID: process.env.FIRESTORE_CLIENT_ID,
      FIRESTORE_CERT_URL: process.env.FIRESTORE_CERT_URL,
    },
  };
};
