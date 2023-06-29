class UserIsNotFound extends Error {
  constructor(err) {
    super(err);
    this.name = "UserIsNotFound";
    this.message = "Пользователь по указанному _id не найден";
    this.statusCode = 404;
  }
}

module.exports.UserIsNotFound = UserIsNotFound;
