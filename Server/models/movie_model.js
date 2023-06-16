const { default: mongoose } = require("mongoose");

const storedMovieInfo = mongoose.Schema({
    poster: FormData,
    title: String,
});