const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  address: String,
}, { timestamps: true });

module.exports = mongoose.model("Survey", SurveySchema);