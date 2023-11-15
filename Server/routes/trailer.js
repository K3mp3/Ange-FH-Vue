const express = require("express");

const router = express.Router();
const multer = require("multer");
const fs = require("fs"); // Import the fs module
const path = require("path");
const TrailerModel = require("../models/trailer_model");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./trailerimages");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", async (req, res) => {
  try {
    const trailer = await TrailerModel.find();
    res.status(200).json(trailer);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve movies" });
  }
});

router.post("/savetrailer", upload.single("poster"), async (req, res) => {
  const poster = req.file.filename; // Hämta filnamnet för den sparade bilden
  const {link} = req.body;
  const { title } = req.body;
  const { genre } = req.body;
  const { age } = req.body;
  const { duration } = req.body;
  const { date } = req.body;
  const { time } = req.body;

  try {
    const newMovie = await TrailerModel.create({
      poster,
      link,
      title,
      genre,
      age,
      duration,
      date,
      time
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Failed to save movie" });
  }
});

router.get("/image/:name", (req, res) => {
  const imageName = req.params.name;
  console.log("NAME:", imageName);
  res.sendFile(imageName, { root: path.join("./trailerimages") });
});

router.post("/deletetrailer", async (req, res) => {
  const { movieId, movieName } = req.body;

  console.log("movieId:", movieId, "movieName:", movieName);

  try {
    await TrailerModel.findByIdAndRemove(movieId);

    fs.unlinkSync(path.join("./trailerimages", movieName));

    console.log("Movie deleted successfully!");

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log("Failed to delete movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
})

module.exports = router;