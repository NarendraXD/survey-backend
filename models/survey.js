const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["text", "number", "textarea"], default: "text" },
  required: { type: Boolean, default: true }
});

const FormConfigSchema = new mongoose.Schema({
  // We keep a single configuration document, or versioned configurations
  fields: [FieldSchema]
}, { timestamps: true });

module.exports = mongoose.model("FormConfig", FormConfigSchema);

// CR8163ignH5AYvhM
// mongodb+srv://narendraahirwar20038_db_user:<db_password>@cluster0.ebzjvum.mongodb.net/?appName=Cluster0