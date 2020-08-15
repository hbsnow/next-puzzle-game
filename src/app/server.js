// https://auth0.com/blog/jp-developing-real-time-apps-with-firebase-and-firestone/
// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#specify-the-api-audience
const express = require("express");
const next = require("next");
const cors = require("cors");
const firebaseAdmin = require("firebase-admin");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const firebaseAdminCredential = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_AUTH_CLIENT_X509_CERT_URL,
};

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.get("/firebase", jwtCheck, async (req, res) => {
    const { sub: uid } = req.user;

    try {
      const firebaseToken = await firebaseAdmin.auth().createCustomToken(uid);
      res.json({ firebaseToken });
    } catch (err) {
      res.status(500).send({
        message: "Firebase トークンを取得するときにエラーが発生しました。",
        error: err,
      });
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
