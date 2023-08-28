var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const MovieModel = require("../models/movie_model");
const fs = require("fs"); // Import the fs module

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
  const link = req.body.link;

  console.log("link:", link);

  console.log(poster);

  try {
    const newMovie = await MovieModel.create({
      poster: poster,
      title: title,
      link: link,
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

router.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  console.log("ID:", movieId);

  try {
    const movie = await MovieModel.findById(movieId);
    console.log(movie);

    const imagePath = path.join(__dirname, "./images", movie.poster);

    const responseData = {
      _id: movie._id,
      poster: movie.poster,
      title: movie.title,
      link: movie.link,
      imageData: imagePath,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({error: "Failed to retrieve movies"})
  }
  // res.sendFile(imageName, { root: path.join("./images") });
});

router.post("/deletemovie", async (req, res) => {
  const { movieId, movieName } = req.body;

  console.log("movieId:", movieId, "movieName:", movieName);

  try {
    await MovieModel.findByIdAndRemove(movieId);

    fs.unlinkSync(path.join("./images", movieName));

    console.log("Movie deleted successfully!");

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log("Failed to delete movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
})

module.exports = router;