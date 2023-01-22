class ApiError extends Error {
  constructor(message) {
    super(message)
  };
}

module.exports = ApiError
