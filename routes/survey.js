const router = require("express").Router();
const Survey = require("../models/survey");
const auth = require("../middleware/auth");

// Submit — protected (must be logged in)
router.post("/", auth, async (req, res) => {
  try {
    const entry = new Survey(req.body);
    await entry.save();
    res.status(201).json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all — public (anyone can see)
router.get("/", async (req, res) => {
  try {
    const data = await Survey.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// https://survey-backend-pqqt.onrender.com