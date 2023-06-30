class NotFoundError extends Error {
  constructor(message = "Указанный _id не найден") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

module.exports.NotFoundError = NotFoundError;
