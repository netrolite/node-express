const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, next) {
    console.log(err);
    if (err instanceof Error) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandler
