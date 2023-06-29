export default class InvalidRequest extends Error {
  constructor(err) {
    super(err);
    this.name = "InvalidRequest";
    this.message = "Переданы некорректные данные";
    this.statusCode = 400;
  }
}
