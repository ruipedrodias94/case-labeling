const express = require("express");

const controller = require("../../controllers/icd.controller");
const verifyJWT = require("../../middlewares/verifyJWT");

const router = express.Router();

router.route("/register").post(controller.register);

router.route("/all").get(verifyJWT, controller.all);

module.exports = router;
