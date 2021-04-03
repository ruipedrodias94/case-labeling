const express = require("express");

const controller = require("../../controllers/ehr.controller");

const verifyJWT = require("../../middlewares/verifyJWT");

const { validate } = require("express-validation");

const { getById, label, register } = require("../../validations/ehr.validations");

const router = express.Router();

router.route("/all").get(verifyJWT, controller.all);

router.route("/get").get(verifyJWT, validate(getById, {}, {}), controller.get);

router.route("/label").post(verifyJWT, validate(label, {}, {}), controller.label);

router.route("/register").post(verifyJWT, validate(register, {}, {}), controller.register);

module.exports = router;
