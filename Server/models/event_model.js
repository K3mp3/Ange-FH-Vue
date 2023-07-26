const { default: mongoose } = require("mongoose");

const storedEventInfo = mongoose.Schema({
  poster: String,
  image: String,
  title: String,
  link: String,
});

module.exports = mongoose.model("storedEventInfo", storedEventInfo);
