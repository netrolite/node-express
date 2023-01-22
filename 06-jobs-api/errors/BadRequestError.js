const ApiError = require("./ApiError");
const { StatusCodes } = require('http-status-codes');

class BadRequest extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
