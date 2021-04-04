const httpStatus = require("http-status");
const logger = require("../config/logger");
const { User } = require("../models/user.model");
const { registerUser, login } = require("../server-logic/user/user.logic");
const _ = require("lodash");

exports.register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const savedUser = await registerUser(email, password, name);

    if (savedUser) {
      res.status(httpStatus.CREATED);
      return res.json({ registerUser: true, user: savedUser });
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    logger.info("User login");

    const user = await User.findOne({ email: email });

    const userToCookie = { email: user.email, name: user.name };

    const token = await login(user, password);

    res.cookie("jwtToken", token, { httpOnly: false, maxAge: 10000000000 });

    res.cookie("user", JSON.stringify(_.omit(userToCookie, "password")), { httpOnly: false, maxAge: 10000000000 });

    logger.info("User logged in");
    res.status(httpStatus.OK);
    return res.json({ login: true, token: token });
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwtToken");
    res.clearCookie("user");
    logger.info("User logged out");

    return res.json({ logout: true });
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};
