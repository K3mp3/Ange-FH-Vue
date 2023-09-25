/* eslint-disable object-shorthand */
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt"); 
const nodeMailer = require("nodemailer");

const UserModel = require ("../models/user_model");

/* GET users listing. */
router.get('/', async (req, res) => {
  const allUsers = await UserModel.find();
  res.status(200).json(allUsers);
});

router.post("/createuser", async(req, res) => {
  const magicToken = Math.random().toString(36).substring(2, 7);

  const { email } = req.body;
  console.log("body", req.body);
  console.log("token:", magicToken);
  try {
    const foundUser = await UserModel.findOne({ email: email });
    console.log("foundUser", foundUser) 

    if(foundUser) {
      res.status(201).json("It seems that you allready have an account here.")
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const newUser = await UserModel.create({
        password: hashedPassword,
        email: req.body.email,
        magicToken: magicToken,
      });

      console.log("newUser", newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.json("Wrong username or password!");
    console.log("nej 2")
  }
})


router.post("/loginuser", async(req, res) => {
  const { password, email } = req.body;
  generateUniqueToken();
  try {
    const foundUser = await UserModel.findOne({ email: email });
    const match = await bcrypt.compare(password, foundUser.password);
    console.log("match", match);
      res.status(201).json({ email: foundUser.email });
      console.log("Login succeeded");
  } catch (error) {
    res.status(401).json("Wrong email or password!");
    console.log("An error occurred during login");
  }
})

module.exports = router;
