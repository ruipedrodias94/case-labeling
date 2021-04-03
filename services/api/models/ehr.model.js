const mongoose = require("mongoose");
const logger = require("../config/logger");

const ehrSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId },
    labelId: { type: mongoose.Schema.Types.ObjectId },
    labeledAt: { type: Date },
  },
  { timestamps: true }
);

const EHR = mongoose.model("EHR", ehrSchema);

module.exports = { ehrSchema, EHR };
