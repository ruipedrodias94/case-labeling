const express = require("express");
const { validate } = require("express-validation");

const controller = require("../../controllers/user.controller");
const verifyJWT = require("../../middlewares/verifyJWT");
const { register, login } = require("../../validations/user.validations");

const router = express.Router();

router.route("/register").post(validate(register, {}, {}), controller.register);

router.route("/login").post(validate(login, {}, {}), controller.login);

router.route("/logout").post(verifyJWT, controller.logout);

module.exports = router;
