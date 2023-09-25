const { default: mongoose } = require("mongoose");

const storedUser = mongoose.Schema({
    password: String,
    email: String,
    magicToken: String,
});

module.exports = mongoose.model("storedUser", storedUser);