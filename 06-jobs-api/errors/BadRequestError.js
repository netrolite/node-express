const ApiError = require("./ApiError");

class BadRequestError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
