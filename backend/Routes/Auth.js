const express = require("express");
const UserModel = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using Post
router.post("/",[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], (req, res) => {
  const user = UserModel(req.body);
  user.save();
  res.json({ message: "hello" });
});

module.exports = router;
