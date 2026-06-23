const router = require("express").Router();
const Survey = require("../models/survey");
const auth = require("../middleware/auth");

router.get("/config", (req, res) => {
  res.json(formConfig);
});

router.post("/config", auth, (req, res) => {
  formConfig = { fields: req.body.fields };
  res.json({ message: "Config saved" });
});

router.post("/", async (req, res) => {
  try {
    const entry = new Survey({ responseData: req.body.responseData });
    await entry.save();
    res.status(201).json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const data = await Survey.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

let formConfig = {
  fields: [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Phone", name: "phone", type: "text" },
    { label: "Address", name: "address", type: "textarea" },
  ]
};

module.exports = router;