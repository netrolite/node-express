require("dotenv").config();
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError");

function auth(req, res, next) {
    const header = req.headers.authorization;
    console.log(header);
    const regex = /^Bearer(\n|\s)(\w|\.)+$/
    if (!header || !regex.test(header)) {
        throw new ApiError("Invalid authorization header", 400);
    }

    try {
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username, password } = decoded;
        req.user = { id, username, password };
        next();
    } catch (err) {
        throw new ApiError("Not authorized", 401);
    }
}

module.exports = auth;