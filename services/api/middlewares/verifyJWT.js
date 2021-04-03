const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/variables");

const verifyJWT = (req, res, next) => {
  try {
    // Get the accessToken from the cookies
    let accessToken = req.cookies.jwtToken;

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
      return res.status(403).send();
    }

    let user;

    try {
      user = jwt.verify(accessToken, jwtSecret);

      req.user = user;

      next();
    } catch (error) {
      res.sendStatus(401);
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = verifyJWT;
