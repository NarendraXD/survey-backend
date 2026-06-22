const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: String,
  address: String,
}, { timestamps: true });

module.exports = mongoose.model("Survey", SurveySchema);

// CR8163ignH5AYvhM
// mongodb+srv://narendraahirwar20038_db_user:<db_password>@cluster0.ebzjvum.mongodb.net/?appName=Cluster0