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

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
    privateKey: process.env.FIRESTORE_PRIVATE_KEY,
  }),
  databaseURL: `https://${process.env.FIRESTORE_PROJECT_ID}.firebaseio.com`,
});

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.get("/firebase", jwtCheck, async (req, res) => {
    const { sub: uid } = req.user;
    console.log(req.user);

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
    console.log("****");
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
