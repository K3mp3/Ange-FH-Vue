const { default: mongoose } = require("mongoose");

const storedUser = mongoose.Schema({
    password: String,
    email: String,
    magicToken: String,
    isSignedIn: Boolean,
});

module.exports = mongoose.model("storedUser", storedUser);