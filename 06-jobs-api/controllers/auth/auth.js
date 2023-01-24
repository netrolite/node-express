require("dotenv").config();
const User = require("../../models/User");
const { BadRequestError } = require("../../errors");
const { UnauthenticatedError } = require("../../errors")


async function register(req, res) {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
}


async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Must provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError("Invalid credentials");

    const token = user.createJWT();
    res.json({ user: { name: user.name }, token });
}


module.exports = {
    register,
    login
};