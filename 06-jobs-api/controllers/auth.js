require("dotenv").config();
const User = require("../models/User");


async function register(req, res) {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
}


async function login(req, res) {
    // req.user is created by a validator middleware
    const token = req.user.createJWT();
    res.json({ user: { name: req.user.name }, token });
}


module.exports = {
    register,
    login
};