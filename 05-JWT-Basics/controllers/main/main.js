const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const validateUserCredentials = require("./functions/validateUserCredentials");
const ApiError = require("../../errors/ApiError");


async function login(req, res) {
    const { username, password } = req.body;
    validateUserCredentials(req.body);

    const id = nanoid();
    const token = jwt.sign(
        { id, username, password },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    res.status(201).json({ message: "User created", token});
}


async function dashboard(req, res) {
    res.json({ message: `Username: ${req.user.username}. ID: ${req.user.id}. Password: ${req.user.password}`});
}


module.exports = {
    login,
    dashboard
}