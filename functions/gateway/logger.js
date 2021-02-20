const winston = require("winston");
const chalk = require("chalk");
const isProd = process.env.NODE_ENV === "production";

const papertrailTransport = new winston.transports.Http({
  level: process.env.LOG_LEVEL || "debug",
  host: "logs.collector.solarwinds.com",
  path: "/v1/log",
  auth: {
    username: process.env.PAPERTRAIL_USERNAME,
    password: process.env.PAPERTRAIL_TOKEN,
  },
  ssl: true,
});

const consoleTransport = new winston.transports.Console({
  level: process.env.LOG_LEVEL || "debug",
  format: winston.format.combine(
    winston.format.errors(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      let msg = "";
      switch (level) {
        case "error":
          msg += chalk.redBright(level.toUpperCase());
          break;
        case "warn":
          msg += chalk.yellow(level.toUpperCase());
          break;
        case "info":
          msg += chalk.cyanBright(level.toUpperCase());
          break;
        case "http":
          msg += chalk.magentaBright(level.toUpperCase());
          break;
        case "verbose":
          msg += chalk.white(level.toUpperCase());
          break;
        case "debug":
          msg += chalk.grey(level.toUpperCase());
      }
      if (meta.type) {
        msg += chalk.grey(" :: ");
        msg += chalk.blueBright(meta.type.toUpperCase());
      }
      msg += chalk.grey(" :: ");
      msg += chalk.green(timestamp);
      msg += chalk.grey(" :: ");
      if (typeof message === "string") {
        msg += chalk.white(message);
      } else if (meta.httpMethod && meta.path) {
        const { httpMethod: method, path } = meta;
        switch (method) {
          case "GET":
            msg += chalk.greenBright(method);
            break;
          case "POST":
            msg += chalk.yellowBright(method);
            break;
          case "PUT":
            msg += chalk.blueBright(method);
            break;
          case "PATCH":
            msg += chalk.cyanBright(method);
            break;
          case "DELETE":
            msg += chalk.red(method);
            break;
        }
        msg += chalk.white(" " + path);
        msg += "\n";
        const { params, query, headers } = message;
        if (params) {
          msg += chalk.grey("\tPARAMS :: ") + JSON.stringify(params) + "\n";
        }
        if (query) {
          msg += chalk.grey("\tQUERY :: ") + JSON.stringify(query) + "\n";
        }
        if (headers) {
          msg += chalk.grey("\tHEADERS :: ") + JSON.stringify(headers) + "\n";
        }
      } else {
        msg += chalk.white(JSON.stringify(message, null, 2));
      }
      return msg;
    })
  ),
});

module.exports = winston.createLogger({
  transports: [isProd ? papertrailTransport : consoleTransport],
});
