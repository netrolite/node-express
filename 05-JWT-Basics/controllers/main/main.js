const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const validateUserCredentials = require("./functions/validateUserCredentials");
const ApiError = require("../../errors/ApiError");


async function login(req, res) {
    const { username, password } = req.body;
    validateUserCredentials(req.body);
    console.log(password);

    const id = nanoid();
    const token = jwt.sign(
        { id, username, password },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    res.status(201).json({ message: "User created", token});
}


async function dashboard(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = `Username: ${decoded.username} Password: ${decoded.password} ID: ${decoded.id}.`;
        res.json({ message: response });
    } catch (err) {
        throw new ApiError("Not authorized", 401);
    }
}


module.exports = {
    login,
    dashboard
}