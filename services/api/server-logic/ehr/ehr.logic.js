const logger = require("../../config/logger");
const { EHR } = require("../../models/ehr.model");

exports.label = async (id, doctorId, labelId) => {
  try {
    const ehr = await EHR.findByIdAndUpdate(id, { doctorId: doctorId, labelId: labelId, labeledAt: new Date() });

    await ehr.save();

    return ehr;
  } catch (error) {
    logger.error(JSON.stringify({ errorMessage: error.message, errorCode: error.code, errorName: error.name }));
    throw new Error(error);
  }
};
