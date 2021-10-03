const express = require("express");
const UserModel = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a user using Post : /api/auth/createuser . No login required

router.post(
  "/createuser",
  [
    body("name", "Name Must Have atleast 3 letters").isLength({ min: 3 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password Must have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check if user exists
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "Sorry this user already exists with this email address",
        });
      }
      //create user
      user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
