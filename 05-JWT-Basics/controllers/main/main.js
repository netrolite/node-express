const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const validateUserCredentials = require("./functions/validateUserCredentials");

async function login(req, res) {
    const { username, password } = req.body;
    validateUserCredentials(req.body);
    const id = nanoid();
    const token = jwt.sign(
        { id, username },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
    res.status(201).json({ message: `User created. Token: ${token}`});
}

async function dashboard(req, res) {
    res.status(200).json({ message: `ID: ${req.user.id}. Username: ${req.user.username}`});
}

module.exports = {
    login,
    dashboard
}