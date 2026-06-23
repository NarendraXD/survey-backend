const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fields: { type: Array, required: true }, // The custom questions for this specific user
  assignedTo: { type: String, required: true }, // The email of the user who needs to fill it out
  createdBy: { type: String, required: true }, // The admin's email
  isCompleted: { type: Boolean, default: false }, // Tracks if the user finished it
  responseData: { type: Object, default: {} }, // The user's answers will go here
}, { timestamps: true });

module.exports = mongoose.model("Survey", SurveySchema);