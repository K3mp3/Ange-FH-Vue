const { default: mongoose } = require("mongoose");

const storedMovieInfo = mongoose.Schema({
  poster: String,
  title: String,
  link: String,
});

module.exports = mongoose.model("storedmovies", storedMovieInfo);
