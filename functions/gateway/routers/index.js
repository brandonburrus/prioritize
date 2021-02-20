const authRouters = require("./auth");
const firestoreRouters = require("./firestore");

module.exports = [...authRouters, ...firestoreRouters];
