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
  try {
    const foundUser = await UserModel.findOne({ email: email });
    const match = await bcrypt.compare(password, foundUser.password);
    console.log("match", match);

    if (match) {
      const newMagicToken = Math.random().toString(36).substring(2, 7);

      foundUser.magicToken = newMagicToken;
      await foundUser.save();
      console.log(foundUser.magicToken);

      const userEmail = foundUser.email;

      const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
          user: "k3mp314@gmail.com",
          pass: "vuzs xrnz zxrd mujz "
        }
      })

      const mailOptions = {
        from: "k3mp314@gmail.com",
        to: userEmail,
        subject: "Magic Token",
        text: `Your Magic Token: ${newMagicToken}`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          res.status(500).json("Error sending email");
        } else {
          console.log("Email sent:", info.response);
          res.status(201).json({ email: userEmail});
          console.log("Login succeeded!");
        }
      });
    } else {
      res.status(401).json("Wrong email or password");
      console.log("Login failed");
    }
      // res.status(201).json({ email: foundUser.email });
      // console.log("Login succeeded");
  } catch (error) {
    res.status(500).json("Wrong email or password!");
    console.log("An error occurred during login");
  }
})

module.exports = router;
