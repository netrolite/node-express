// this file allows for importing errors without referencing the error file.
// E.g "const NotFoundError = require(../errors)"
const ApiError = require("./ApiError");
const BadRequestError = require("./BadRequestError");
const NotFoundError = require("./NotFoundError");
const UnauthenticatedError = require("./UnauthenticatedError");

module.exports = {
    ApiError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
}