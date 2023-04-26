var express = require('express');
var router = express.Router();
const crypto = require("crypto-js");
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt"); 

const UserModel = require ("../models/user_model");

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const allUsers = await UserModel.find();
  res.status(200).json(allUsers);
});


router.post("/createuser", async(req, res) => {
  console.log("body", req.body);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  let newUser = await UserModel.create({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });

  console.log("newUser", newUser);
  res.status(201).json(newUser);
})


router.post("/loginuser", async(req, res) => {
  const { username, password, email } = req.body;

  try {
    const foundUser = await UserModel.findOne({ username: username, email: email });
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      res.json({ username: foundUser.username });
    } else {
      res.json("Wrong username or password!");
    }
  } catch (error) {
    res.json("Wrong username or password!");
  }
})

module.exports = router;
