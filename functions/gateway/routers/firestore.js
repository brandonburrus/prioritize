const { authCheck } = require("../util");
const router = require("../router");

module.exports = [
  router("/firestore").get(async (req, log) => {
    const auth = await authCheck(req, log);
    return {
      status: 201,
      msg: "test",
      auth,
    };
  }),
];
