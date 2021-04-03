const express = require("express");

const userRoutes = require("./user.routes");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

router.use("/user", userRoutes);

module.exports = router;
