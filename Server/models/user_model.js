const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const storedUser = mongoose.Schema({
    password: String,
    email: String
});

module.exports = mongoose.model("storedUser", storedUser);