const authRouters = require("./auth");
const priorityRouters = require("./priorities");
const preferenceRouters = require("./preferences");

module.exports = [...authRouters, ...priorityRouters, ...preferenceRouters];
