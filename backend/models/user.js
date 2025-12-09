const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        required: false, //sayings its not required to hopefully save on issues later with users that dont have it
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;