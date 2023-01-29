const ApiError = require("../errors/ApiError");

function errorHandler(err, req, res, next) {
    console.log(err);

    let statusCode = err.statusCode;
    let message = err.message;

    if (err instanceof ApiError) {
        return res.status(statusCode).json({ message })
    }

    return res.status(500).json({ err })
}

module.exports = errorHandler
