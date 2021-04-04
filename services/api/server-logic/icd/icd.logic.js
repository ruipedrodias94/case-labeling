const logger = require("../../config/logger");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { ICD } = require("../../models/icd.model");

exports.registerICD = async () => {
  try {
    fs.createReadStream(path.join(__dirname, "conditions.csv"))
      .pipe(csv({ separator: "\t" }))
      .on("data", async (data) => {
        const newICD = await ICD({
          icdId: data.ICD_10,
          description: data.ICD_10_Description,
        });

        await newICD.save();
      });

    return true;
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    throw new Error(error);
  }
};
