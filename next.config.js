module.exports = () => {
  return {
    env: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_MESUREMENT_ID: process.env.FIREBASE_MESUREMENT_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
      FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
      FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
      FIREBASE_AUTH_PROVIDER_X509_CERT_URL:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      FIREBASE_AUTH_CLIENT_X509_CERT_URL:
        process.env.FIREBASE_AUTH_CLIENT_X509_CERT_URL,
    },
  };
};