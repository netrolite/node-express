const ApiError = require("./ApiError");
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
