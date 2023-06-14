var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt"); 

const UserModel = require ("../models/user_model");

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const allUsers = await UserModel.find();
  res.status(200).json(allUsers);
});


router.post("/createuser", async(req, res) => {
  const { username, email } = req.body;
  console.log("body", req.body);
  try {
    const foundUser = await UserModel.findOne({ username: username, email: email });
    console.log("foundUser", foundUser) 

    if(foundUser) {
      res.status(201).json("It seems that you allready have an account here.")
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      let newUser = await UserModel.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
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
  const { username, password, email } = req.body;
  console.log("body", req.body)

  try {
    const foundUser = await UserModel.findOne({ username: username, email: email });
    console.log("foundUser", foundUser);
    const match = await bcrypt.compare(password, foundUser.password);
    console.log("match", match);
    if (match) {
      res.status(201).json({ username: foundUser.username });
      console.log("ja")
    } else {
      res.json("Wrong username or password!");
      console.log("nej")
    }
  } catch (error) {
    res.json("Wrong username or password!");
    console.log("nej 2")
  }
})

module.exports = router;
