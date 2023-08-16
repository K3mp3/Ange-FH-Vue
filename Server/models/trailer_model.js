const { default: mongoose } = require("mongoose");

const storedMovieTrailerInfo = mongoose.Schema({
  poster: String,
  title: String,
  link: String,
});

module.exports = mongoose.model("storedMovieTrailerInfo", storedMovieTrailerInfo);
