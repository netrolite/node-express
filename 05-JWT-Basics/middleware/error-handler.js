const ApiError = require('../errors/ApiError')
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).send('Internal server error. Try again later.')
}

module.exports = errorHandlerMiddleware
