const User = require("../../models/User");
const bcrypt = require("bcryptjs");


async function register(req, res) {
    const user = await User.create(req.body);
    res.status(201).json(user);
}


async function login(req, res) {
    res.status(200).json(req.body);
    const { name, email, password } = req.body;
}


module.exports = {
    register,
    login
};  