/* eslint-disable object-shorthand */
const express = require('express');

const router = express.Router();
const bcrypt = require("bcrypt"); 
const nodeMailer = require("nodemailer");

const UserModel = require ("../models/user_model");

let magicToken = ""; 
let isFoundToken = false;

  // eslint-disable-next-line consistent-return

/* GET users listing. */
router.get('/', async (req, res) => {
  const allUsers = await UserModel.find();
  res.status(200).json(allUsers);
});

router.post("/createuser", async(req, res) => {
  async function generateUniqueToken() {
    magicToken = Math.random().toString(36).substring(2, 7);
    const foundToken = await UserModel.findOne({ magicToken: magicToken });

    if (foundToken) {
      isFoundToken = true;
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
  let magicToken; 

  // eslint-disable-next-line consistent-return
  async function generateUniqueToken() {
    magicToken = Math.random().toString(36).substring(2, 7);
    const foundToken = await UserModel.findOne({ magicToken: magicToken });
    console.log("foundToken:", foundToken);

    if (foundToken) {
      console.log("found");
      generateUniqueToken();
    } 
  }

  generateUniqueToken();

  const { password, email } = req.body;
  try {
    const foundUser = await UserModel.findOne({ email: email });
    const match = await bcrypt.compare(password, foundUser.password);
    const magicTokenTimeout = 10 * 10 * 100; // 60 minutes in milliseconds

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
              const foundToken = await UserModel.findOne({ magicToken: magicToken });
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
})

module.exports = router;
