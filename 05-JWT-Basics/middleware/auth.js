const ApiError = require("../errors/ApiError");

function auth(req, res, next) {
    const header = req.headers.authorization;
    const regex = /^Bearer\s/;

    if (!header || !regex.test(header)) {
        throw new ApiError("Invalid authorization header", 400);
    }
    next();
}

module.exports = auth;