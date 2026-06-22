const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const FormConfig = require("../models/formConfig");
const authMiddleware = require("../middleware/auth");

// 1. GET Layout Configuration Schema
router.get("/config", async (req, res) => {
  try {
    const config = await FormConfig.findOne();
    res.json(config || { fields: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to read layout configuration schemas" });
  }
});

// 2. POST Save/Update Configuration Schema
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
    res.json({ message: "Layout configurations updated successfully!", config });
  } catch (err) {
    res.status(500).json({ error: "Database failed to save schema layout configs" });
  }
});

// 3. GET Collected Survey Submissions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await Survey.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to read database entries" });
  }
});

// 4. POST Submit Survey Response Entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { responseData } = req.body;
    const newResponse = new Survey({
      userEmail: req.user?.email || "Anonymous User",
      responseData
    });
    await newResponse.save();
    res.status(201).json({ message: "Survey data tracked successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit response to server" });
  }
});

module.exports = router;