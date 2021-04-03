const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const { jwtSecret } = require("../config/variables");
const APIError = require("./APIError");

exports.generateJWT = (_id, email) => {
  try {
    // Sign the jwt token and returning it
    const jwtToken = jwt.sign({ email: email, _id: _id }, jwtSecret);

    return jwtToken;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
};
