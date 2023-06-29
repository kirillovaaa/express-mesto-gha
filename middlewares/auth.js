module.exports.authMiddleware = (req, res, next) => {
  req.user = {
    _id: "649d2403aebd5b11db813f0e",
  };
  next();
};
