const { default: mongoose } = require("mongoose");

const storedMovieTrailerInfo = mongoose.Schema({
  poster: String,
  link: String,
  title: String,
  genre: String,
  age: Number,
  duration: String,
  date: Date,
  time: String, 
});

module.exports = mongoose.model("storedMovieTrailerInfo", storedMovieTrailerInfo);
