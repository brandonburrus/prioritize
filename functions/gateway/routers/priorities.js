const { authCheck } = require("../util");
const router = require("../router");

module.exports = [
  router("/priorities").get(async (req, log) => {
    await authCheck(req, log);
    return {
      status: 201,
      msg: "test",
    };
  }),
];
