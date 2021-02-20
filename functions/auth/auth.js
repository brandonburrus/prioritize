// const firebase = require("../util/firebase");

/**
 * TODO: Add documentation
 */
exports.handler = async function (event, ctx) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(process.env),
  };
};
