const logger = require("./config/logger");
const app = require("./config/express");
const { port, env } = require("./config/variables");

const mongoose = require("./config/mongoose");

mongoose.connect();
console.log("oi");

app.listen(port, () => logger.info(`Server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
