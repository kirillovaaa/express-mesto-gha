module.exports.errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
};
