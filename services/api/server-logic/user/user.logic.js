const { User } = require("../../models/user.model");
const bcrypt = require("bcrypt");
const logger = require("../../config/logger");
const { generateJWT } = require("../../utils/generateJWT");

exports.registerUser = async (email, password, name) => {
  try {
    const newUser = await User({
      email: email,
      name: name,
      password: await bcrypt.hashSync(password, 10),
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return savedUser;
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    throw new Error(error);
  }
};

exports.login = async (user, password) => {
  try {
    if (user) {
      const encryptedPassword = bcrypt.compareSync(password, user.password);

      if (encryptedPassword) {
        const tokenObject = generateJWT(user._id, user.email);

        return tokenObject;
      } else {
        throw new Error("user credentials incorrect");
      }
    } else {
      throw new Error("user does not exist");
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    throw new Error(error);
  }
};
