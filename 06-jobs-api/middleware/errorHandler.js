// error handlers must take 4 arguments
function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    const errObject = { message: err.message };
    if (err.code === 11000) handleDuplicateErr(errObject);
    else if (err.name === "ValidationError") handleValidationErr(errObject);
    res.status(statusCode).json(errObject);


    function handleDuplicateErr() {
        statusCode = 400;
        errObject.message = "Duplicate error"
        errObject.duplicateKeys = Object.keys(keyValue);
    }


    function handleValidationErr() {
        statusCode = 400;
        errObject.message = "Validation error";
        const errorsArray = Object.values(err.errors);
        errObject.invalid = formatValidationErrs(errorsArray);
    }


    function formatValidationErrs(errorsArray) {
        return errorsArray.map(error => {
            const formattedError = {};
            formattedError.message = error.message;
            formattedError.kind = error.kind;
            formattedError.path = error.path;
            if (error.kind === "enum") {
                formattedError.possibleValues = error.properties.enumValues;
            }

            return formattedError;
        })
    }
}


module.exports = errorHandler
