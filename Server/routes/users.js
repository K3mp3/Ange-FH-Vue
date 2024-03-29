/* eslint-disable object-shorthand */
const express = require('express');

const router = express.Router();
const bcrypt = require("bcrypt"); 
const nodeMailer = require("nodemailer");

const UserModel = require ("../models/user_model");

let magicToken = ""; 
let foundToken = "";

router.post("/createuser", async(req, res) => {
  async function generateUniqueToken() {
    magicToken = Math.random().toString(36).substring(2, 7);
    foundToken = await UserModel.findOne({ magicToken: magicToken });

    if (foundToken) {
      generateUniqueToken()
      return;
    } 

      const { email } = req.body;
      try {
        const foundUser = await UserModel.findOne({ email: email });

        if(foundUser) {
          res.status(201).json("It seems that you allready have an account here.");
        } else {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

          const newUser = await UserModel.create({
            password: hashedPassword,
            email: req.body.email,
            magicToken: magicToken,
            isSignedIn: false,
          });

          res.status(201).json(newUser);
        }
      } catch (error) {
        res.json(error);
      }
    }

    generateUniqueToken();
})


router.post("/loginuser", async(req, res) => {
  async function signInUser() {
    magicToken = Math.random().toString(36).substring(2, 7);
    foundToken = await UserModel.findOne({ magicToken: magicToken});

    if (foundToken) {
      signInUser();
      return; 
    }

    const { password, email } = req.body;   
    try {
      const foundUser = await UserModel.findOne({ email: email });
      console.log("foundUser:", foundUser);

      if (!foundUser) {
        console.log("null foundUser");
        res.status(401).json({ message: "Email or password is wrong" });
        return;
      }

      const match = await bcrypt.compare(password, foundUser.password);
      console.log(match);

      if (!match) {
        console.log("null match");
        res.status(401).json({ message: "Email or password is wrong" });
        return;
      }

      const magicTokenTimeout = 60 * 60 * 1000; // 60 minutes in milliseconds

      if (!foundUser) {
        console.log("null");
        res.status(401).json({ message: "Email or password is wrong" });
        return;
      }
  
      if (match) {
        foundUser.magicToken = magicToken;
        await foundUser.save();
  
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
          text: `Your Magic Token: ${magicToken}`
        }
  
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.status(500).json("Error sending email");
          } else {
            res.status(201).json({ email: userEmail});
  
            setTimeout(async () => {
              async function generateUniqueTokenTimer() {
                magicToken = Math.random().toString(36).substring(2, 7);
                foundToken = await UserModel.findOne({ magicToken: magicToken });
                console.log("foundToken:", foundToken);
            
                if (foundToken) {
                  console.log("found");
                  generateUniqueTokenTimer();
                } 
              }
              generateUniqueTokenTimer();
  
              foundUser.magicToken = magicToken;
              await foundUser.save();
            }, magicTokenTimeout);
          }
        });
      } else {
        res.status(401);
      }
    } catch (error) {
      res.status(500);
    }
  }
  signInUser();
})


router.post("/checktoken", async(req, res) => {
  const {token, email} = req.body;

  try {
    const foundUser = await UserModel.findOne({email: email});
    console.log("foundUser Token:", foundUser.magicToken)
    console.log(token);

    if (token === foundUser.magicToken) {
      foundUser.isSignedIn = true;
      await foundUser.save();
      res.status(201).json({ message: "Authentication successful" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }

  } catch (error) {
    res.status(500);
  }
})


router.post("/issignedin", async(req, res) => {
  let isUserSignedIn = false;
  console.log("isUserSignedIn:", isUserSignedIn);
  const {signedIn} = req.body;
  console.log("isSignedIn:", signedIn);

  isUserSignedIn = signedIn;
  console.log("isUserSignedIn:", isUserSignedIn);
})

router.post("/isusersignedin", async(req, res) => {
  let isUserSignedIn = false;
  console.log("isUserSignedIn:", isUserSignedIn);
  const {signedIn} = req.body;
  console.log("isSignedIn:", signedIn);

  isUserSignedIn = signedIn;
  console.log("isUserSignedIn:", isUserSignedIn);
})

module.exports = router;
