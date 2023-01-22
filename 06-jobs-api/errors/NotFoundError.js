const { StatusCodes } = require('http-status-codes');
const ApiError = require('./ApiError');

class NotFoundError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
