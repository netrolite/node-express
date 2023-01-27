const User = require("../models/User");
const {
    BadRequestError,
    UnauthenticatedError
} = require("../errors");


async function validateLoginCredentials(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Must provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) throw new UnauthenticatedError("User does not exist");

    const passwordsMatch = await user.comparePasswords(password);
    if (!passwordsMatch) throw new UnauthenticatedError("Incorrect password");

    req.user = user;
    next();
}


module.exports = validateLoginCredentials;