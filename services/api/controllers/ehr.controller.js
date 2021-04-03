const httpStatus = require("http-status");
const logger = require("../config/logger");
const { EHR } = require("../models/ehr.model");
const { label } = require("../server-logic/ehr/ehr.logic");

exports.register = async (req, res, next) => {
  try {
    const description = req.body.description;

    const ehr = await EHR({ description: description });

    await ehr.save();

    if (ehr) {
      res.status(httpStatus.CREATED);
      return res.json({ createEHR: true, ehr: ehr });
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};

exports.all = async (req, res, next) => {
  try {
    const ehrs = await EHR.find();

    if (ehrs) {
      res.status(httpStatus.OK);
      return res.json({ allEHRs: true, ehrs: ehrs });
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const id = req.query.id;

    const ehr = await EHR.findById(id);

    if (ehr) {
      res.status(httpStatus.OK);
      return res.json({ ehr: true, ehr: ehr });
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};

exports.label = async (req, res, next) => {
  try {
    const id = req.body.id;
    const labelId = req.body.labelId;

    const ehr = await label(id, req.user._id, labelId);

    if (ehr) {
      res.status(httpStatus.OK);
      return res.json({ labeledEHR: true, ehr: ehr });
    }
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    return next(error);
  }
};
