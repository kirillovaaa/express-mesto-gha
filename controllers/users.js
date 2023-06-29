const User = require("../models/user");

const { InvalidRequest } = require("../errors/InvalidRequest");
const { ServerError } = require("../errors/ServerError");
const { UserIsNotFound } = require("../errors/UserIsNotFound");

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(new InvalidRequest(err));
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new UserIsNotFound();
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof UserIsNotFound) {
        next(err);
      } else {
        next(new ServerError(err));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new InvalidRequest(err));
      } else {
        next(new ServerError(err));
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new InvalidRequest(err));
      } else {
        next(new ServerError(err));
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new InvalidRequest(err));
      } else {
        next(new ServerError(err));
      }
    });
};
