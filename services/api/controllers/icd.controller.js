const httpStatus = require("http-status");
const logger = require("../config/logger");
const { ICD } = require("../models/icd.model");
const { registerICD } = require("../server-logic/icd/icd.logic");

exports.register = async (req, res, next) => {
  try {
    const register = await registerICD();

    return res.json({ registerIDC: true });
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};

exports.all = async (req, res, next) => {
  try {
    const idcs = await ICD.find();

    if (idcs) {
      res.status(httpStatus.OK);
      return res.json({ allIDCs: true, idcs: idcs });
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};
