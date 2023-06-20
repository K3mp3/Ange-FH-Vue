const { default: mongoose } = require("mongoose");

const storedMovieInfo = mongoose.Schema({
  poster: String,
  title: String,
});

module.exports = mongoose.model("storedmovieinfo", storedMovieInfo);
