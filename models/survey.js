const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  responseData: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model("Survey", SurveySchema);