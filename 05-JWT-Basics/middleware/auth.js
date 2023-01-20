require("dotenv").config();
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError");

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const regex = /Bearer(\n|\s)(\w|\.)+/;
    if (!authHeader || !regex.test(authHeader)) {
        throw new ApiError("Invalid authorization header", 400);
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new ApiError("Bad token. Not authorized", 401);
    }
}

module.exports = auth;