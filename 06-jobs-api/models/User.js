const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Min length is 3 characters"],
        maxlength: [30, "Max length is 30 characters"]
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

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}


module.exports = mongoose.model("User", UserSchema);