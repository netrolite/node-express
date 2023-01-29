// error handlers must take 4 arguments
function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    const errObject = {
        message: err.message || "Something went wrong"
    };

    if (err.code === 11000) handleDuplicateErr(errObject);
    else if (err.name === "ValidationError") handleValidationErr(errObject);
    else if (err.name === "CastError" && err.kind === "ObjectId") {
        handleObjectIdCastErr()
    }
    res.status(statusCode).json(errObject);


    function handleDuplicateErr() {
        statusCode = 400;
        errObject.message = "Duplicate error"
        errObject.duplicateKeys = Object.keys(err.keyValue);
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


    function handleObjectIdCastErr() {
        statusCode = 400;
        errObject.message = "ObjectId must be a 24 character string";
    }
}


module.exports = errorHandler
