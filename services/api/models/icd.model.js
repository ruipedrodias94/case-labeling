const mongoose = require("mongoose");
const logger = require("../config/logger");

const icdSchema = new mongoose.Schema(
  {
    icdId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ICD = mongoose.model("ICD", icdSchema);

module.exports = { icdSchema, ICD };
