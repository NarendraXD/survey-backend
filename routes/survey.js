const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const FormConfig = require("../models/formConfig");
const authMiddleware = require("../middleware/auth"); // Assuming this is your token verification middleware

// 1. GET Current Form Layout Schema (Public or Authenticated)
router.get("/config", async (req, res) => {
  try {
    let config = await FormConfig.findOne();
    // If no config exists yet, return empty list or defaults
    if (!config) {
      return res.json({ fields: [] });
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching layout configuration" });
  }
});

// 2. POST Save/Update Form Layout Schema (Admin Only)
// Note: You can add an admin check in your authMiddleware if needed
router.post("/config", authMiddleware, async (req, res) => {
  try {
    const { fields } = req.body;
    
    let config = await FormConfig.findOne();
    if (config) {
      config.fields = fields;
      await config.save();
    } else {
      config = new FormConfig({ fields });
      await config.save();
    }
    res.json({ message: "Layout updated successfully", config });
  } catch (err) {
    res.status(500).json({ error: "Failed to update configuration template" });
  }
});

// 3. GET All Survey Responses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await Survey.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching entries" });
  }
});

// 4. POST Submit a Survey Response
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { responseData } = req.body;
    
    const newResponse = new Survey({
      userEmail: req.user?.email || "Anonymous", // filled if your auth middleware appends req.user
      responseData
    });

    await newResponse.save();
    res.status(201).json({ message: "Survey recorded successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit survey data" });
  }
});

module.exports = router;