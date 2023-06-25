var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const MovieModel = require("../models/movie_model");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", async (req, res) => {
  try {
    let movies = await MovieModel.find();

    res.status(200).json(movies);
    console.log(movies);
  } catch (error) {
    console.log("Error retrieving movies:", error);
    res.status(500).json({ error: "Failed to retrieve movies" });
  }
});

router.post("/savemovie", upload.single("poster"), async (req, res) => {
  const { title } = req.body;
  const poster = req.file.filename; // Hämta filnamnet för den sparade bilden

  console.log(poster);

  try {
    const newMovie = await MovieModel.create({
      poster: poster,
      title: title,
    });

    console.log("newMovie", newMovie);

    res.status(201).json(newMovie);
  } catch (error) {
    console.log("Error saving movie:", error);
    res.status(500).json({ error: "Failed to save movie" });
  }
});

router.get("/image/:name", (req, res) => {
  const imageName = req.params.name;
  console.log("NAME:", imageName);
  res.sendFile(imageName, { root: path.join("./images") });
});

module.exports = router;
