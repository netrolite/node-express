const User = require("../models/User");


async function register(req ,res) {
    res.json(req.body);
}

async function login(req ,res) {
    res.json(req.body);
}

module.exports = {
    register,
    login
}