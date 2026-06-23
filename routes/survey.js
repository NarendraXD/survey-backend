const router = require("express").Router();
const Survey = require("../models/survey");
const auth = require("../middleware/auth");

// 1. Admin creates and assigns a specific survey to a user
router.post("/create", auth, async (req, res) => {
  try {
    const { title, description, fields, assignedTo, adminEmail } = req.body;
    
    const newSurvey = new Survey({
      title,
      description,
      fields,
      assignedTo,
      createdBy: adminEmail
    });

    await newSurvey.save();
    res.status(201).json({ message: "Survey assigned successfully!", survey: newSurvey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. User fetches ONLY the surveys assigned to their email
router.get("/my-surveys", auth, async (req, res) => {
  try {
    // We pass the user's email as a query parameter from the frontend
    const userEmail = req.query.email; 
    if (!userEmail) return res.status(400).json({ error: "Email is required" });

    const data = await Survey.find({ assignedTo: userEmail }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. User submits their answers to a specific assigned survey
router.post("/:id/submit", auth, async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { responseData } = req.body;

    // Find the assigned survey and update it with the answers
    await Survey.findByIdAndUpdate(surveyId, {
      responseData: responseData,
      isCompleted: true
    });

    res.json({ message: "Survey submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Admin fetches ALL surveys (to review answers)
router.get("/all", auth, async (req, res) => {
  try {
    const data = await Survey.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;