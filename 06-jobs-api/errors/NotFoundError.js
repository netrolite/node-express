const ApiError = require("./ApiError");

class NotFoundError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
