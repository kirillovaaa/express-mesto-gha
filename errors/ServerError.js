class ServerError extends Error {
  constructor(err) {
    super(err);
    this.name = "ServerError";
    this.message = "Ошибка сервера";
    this.statusCode = 500;
  }
}

module.exports.ServerError = ServerError;
