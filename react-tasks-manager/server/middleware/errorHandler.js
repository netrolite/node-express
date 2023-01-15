const ApiError = require("../errors/ApiError");

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.log("ERROR!!!");
    // console.error(err);
    res.status(500).json(err);
}

module.exports = errorHandler;