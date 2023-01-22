const ApiError = require("../errors/ApiError");

function errorHandler(err, req, res, next) {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ err: { message: err.message } })
    }

    return res.status(500).json({ err })
}

module.exports = errorHandler
