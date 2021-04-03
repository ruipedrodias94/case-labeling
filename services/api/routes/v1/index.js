const express = require("express");

const userRoutes = require("./user.routes");
const icdRoutes = require("./icd.routes");
const ehrRoutes = require("./ehr.routes");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

router.use("/user", userRoutes);

router.use("/icd", icdRoutes);

router.use("/ehr", ehrRoutes);

module.exports = router;
