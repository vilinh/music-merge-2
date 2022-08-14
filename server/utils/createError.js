class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

class CustomError extends ExpressError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = { ExpressError, CustomError };
