const logger = require("./logger");
const routers = require("./routers");
const { v4: transId } = require("uuid");

/**
 * TODO: Add documentation
 */
function responseFactory(res, transId) {
  const { headers = {}, body = {}, ...rest } = res;
  const status = rest.status || body.status || 200;
  return {
    statusCode: status,
    headers: {
      "Content-Type": headers["Content-Type"] || "application/json",
      "x-transaction-id": transId,
      ...headers,
    },
    body:
      typeof body === "string"
        ? body
        : JSON.stringify({
            status,
            ...body,
            ...rest,
          }),
  };
}

module.exports.handler = async function (event, ctx) {
  const transactionId = String(event.headers["x-transaction-id"] || transId());
  const log = logger.child({ transactionId });
  try {
    for (const router of routers) {
      let routerResult = router.handle(event, log, ctx);
      if (routerResult instanceof Promise) {
        routerResult = await routerResult;
      }
      if (routerResult) {
        const res = responseFactory(routerResult, transactionId);
        log.http(res, { type: "response" });
        return res;
      }
    }
    const notFoundRes = responseFactory(
      {
        status: 404,
        error: {
          msg: "Not Found",
        },
      },
      transactionId
    );
    log.http(notFoundRes, { type: "response" });
    return notFoundRes;
  } catch (err) {
    log.error(err);
    const errorRes = responseFactory(
      {
        status: 500,
        err,
      },
      transactionId
    );
    log.http(errorRes, { type: "response" });
    return errorRes;
  }
};
