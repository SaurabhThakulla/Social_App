const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
console.log("✅ User fields:", Object.keys(User.schema.paths));
// Signin
router.post("/signin", async (req, res) => {
  try {
    const { email, name, pic, password } = req.body;
    const bot = await User.findOne({ email });
    if (!bot) {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ email, name, pic, password: hash });
      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } else {
      res.status(400).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//Login
module.exports = router;
