const express = require("express");
const UserModel = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../Middleware/fetchUser");

const JWT_SECRET = "akanaspro";

//ROUTE : 1 - Create a user using POST : /api/auth/createuser . No login required

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
      let success ;
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({
          error: "Sorry this user already exists with this email address",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create user
      user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // sign data
      const data = {
        user: {
          id: user.id,
        },
      };
      //generate token

      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success , token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

//ROUTE : 2 - Create a user using POST : /api/auth/login . No login required

router.post(
  "/login",
  [body("email", "Enter a valid email address").isEmail()],
  [body("password", "Password Cannot be blank").exists()],
  async (req, res) => {
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(404)
          .json({ error: "Please try to login again correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(404)
          .json({ error: "Please try to login again correct credentials" });
      }
      // sign data
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;

      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//ROUTE : 3 - Get Logged in user details POST : /api/auth/getuser . No Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await UserModel.findById(userId);
    return res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
