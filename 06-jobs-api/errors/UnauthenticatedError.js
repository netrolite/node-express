const ApiError = require("./ApiError");

class UnauthenticatedError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthenticatedError;
