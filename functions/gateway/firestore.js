// const { firebase } = require("./init");
const router = require("./router");

module.exports = [
  router("/firestore").get((req, log) => {
    log.info("Hello!");
    return {
      status: 201,
      msg: "test",
    };
  }),
];
