const router = require("express").Router();
const Survey = require("../models/survey");
const auth = require("../middleware/auth"); // Still needed for Admin routes

// Admin creates survey (Auth Required)
router.post("/create", auth, async (req, res) => {
  try {
    const { title, description, fields, assignedTo, adminEmail } = req.body;
    const newSurvey = new Survey({ title, description, fields, assignedTo, createdBy: adminEmail });
    await newSurvey.save();
    res.status(201).json({ message: "Survey assigned successfully!", survey: newSurvey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin fetches ALL surveys (Auth Required)
router.get("/all", auth, async (req, res) => {
  try {
    const data = await Survey.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// PUBLIC ROUTES (No auth middleware below)
// ==========================================

// Public: Fetch a specific survey by its unique URL ID
router.get("/:id", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ error: "Survey not found" });
    res.json(survey);
  } catch (err) {
    res.status(500).json({ error: "Invalid survey link" });
  }
});

// Public: Submit answers to a specific survey
router.post("/:id/submit", async (req, res) => {
  try {
    await Survey.findByIdAndUpdate(req.params.id, {
      responseData: req.body.responseData,
      isCompleted: true
    });
    res.json({ message: "Survey submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;