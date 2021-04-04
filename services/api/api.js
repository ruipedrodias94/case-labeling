const logger = require("./config/logger");
const app = require("./config/express");
const { port, env } = require("./config/variables");

const mongoose = require("./config/mongoose");

mongoose.connect();

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => logger.info(`Server started on port ${port} (${env})`));
}

/**
 * Exports express
 * @public
 */
module.exports = app;
