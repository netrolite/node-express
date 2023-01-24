const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Min length is 3 characters"],
        maxlength: [30, "Max length is 30 characters"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [3, "Min length is 3 characters"],
        maxlength: [320, "Max length is 320 characters"],
        match: [emailRegex, "Invalid email format"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        // min/max length isn't needed because passwords are stored as fixed-length hashes
    }
})

UserSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", UserSchema);