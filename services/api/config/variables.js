const path = require("path");

// import .env variables
require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
  debug: true,
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.MONGO_URI,
    dbname: process.env.DB_NAME,
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
};
