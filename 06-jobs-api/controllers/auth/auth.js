require("dotenv").config();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");


async function register(req, res) {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
}


async function login(req, res) {
    res.status(200).json(req.body);
    const { name, email, password } = req.body;
}


module.exports = {
    register,
    login
};