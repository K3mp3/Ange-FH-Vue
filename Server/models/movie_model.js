const { default: mongoose } = require("mongoose");

const storedMovieInfo = mongoose.Schema({
  poster: String,
  image: String,
  title: String,
  description: String,
  link: String,
});

module.exports = mongoose.model("storedmovies", storedMovieInfo);
