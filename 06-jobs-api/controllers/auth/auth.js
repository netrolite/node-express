const User = require("../../models/User");
const bcrypt = require("bcryptjs");


async function register(req, res) {
    const { name, email, password } = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userObjForDB = { name, email, password: hashedPassword };
    
    const user = await User.create(userObjForDB);
    res.status(201).json(user);
}

async function login(req, res) {
    res.status(200).json(req.body);
}

module.exports = {
    register,
    login
};  