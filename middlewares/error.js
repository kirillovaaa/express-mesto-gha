module.exports.errorMiddleware = (req, res, next) => {
  next();
};

// res.status(err.statusCode).send({ message: err.message });
