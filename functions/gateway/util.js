const firebase = require("firebase");
const jwt = require("jsonwebtoken");

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
require("firebase/auth");
require("firebase/auth");

// Auth verification
function authCheck(req, log) {
  const token = req.headers["authorization"];
  if (token) {
    const bearerToken = token.split(" ")[1];
    return new Promise((resolve, reject) => {
      jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        }
        log.debug("Verified and decoded user token", { token: decoded });
        resolve(decoded);
      });
    });
  }
  throw new Error("Unauthorized");
}

// Auth token generation
function createToken(body, log) {
  log.debug("Creating JWT...", { tokenInfo: body });
  return jwt.sign(body, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "24h",
  });
}

module.exports = {
  firebaseConfig,
  firebase,
  authCheck,
  createToken,
};
