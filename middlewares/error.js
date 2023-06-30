module.exports.errorMiddleware = (err, req, res, next) => {
  res.headers["Content-Type"] = "text/html";
  res.status(err.statusCode).send(err.message);
};
