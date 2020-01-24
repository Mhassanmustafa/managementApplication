const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User } = require("../../models/admin");

const express = require("express");
const router = express.Router();

// sign up process
router.post("/SignUp", async (req, res) => {
  //check if a user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  //valid user data

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

//login process
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  console.log(token);
  res.send(token);
});

module.exports = router;
