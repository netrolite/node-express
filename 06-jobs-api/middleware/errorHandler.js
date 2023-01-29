const { BadRequestError } = require("../errors");
const ApiError = require("../errors/ApiError");

function errorHandler(err, req, res, next) {
    const errObject = {
        statusCode: err.statusCode,
        message: err.message
    }

    console.log(errObject);

    // if is a custom error like "BadRequestError" or "NotFoundError"
    if (err instanceof ApiError) {
        return res.status(statusCode).json({ message })
    }

    if (err.code === 11000) {
        handleDuplicate(errObject, err.keyValue);
        res.status(400).json(errObject);
    }

    return res.status(500).json(errObject);
}


function handleDuplicate(errObject, keyValue) {
    errObject.message = "1 or more entries already exist"
    const duplicateKeys = Object.keys(keyValue);
    errObject.duplicateEntries = duplicateKeys;
}


module.exports = errorHandler
