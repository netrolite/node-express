const ApiError = require("./ApiError");

class BadRequest extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
