const User = require("../models/User");
const BadRequestErr = require("../errors");


async function register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestErr("Invalid data");
    }

    const user = await User.create(req.body);
    res.status(201).json(user);
}

async function login(req, res) {
    res.status(200).json(req.body);
}

module.exports = {
    register,
    login
}; 