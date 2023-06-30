const mongoose = require("mongoose");

const { InvalidRequestError } = require("../errors/InvalidRequestError");
const { ServerError } = require("../errors/ServerError");
const { NotFoundError } = require("../errors/NotFoundError");

const Card = require("../models/card");

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(new ServerError());
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new InvalidRequestError());
      } else {
        next(new ServerError());
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    next(new InvalidRequestError());
  } else {
    Card.findOneAndDelete(req.params.cardId, { runValidators: true })
      .then((card) => {
        if (card === null) {
          throw new NotFoundError("Карточка с указанным _id не найдена");
        }
        res.send({ data: card });
      })
      .catch((err) => {
        if (err instanceof NotFoundError) {
          next(err);
        } else {
          next(new ServerError());
        }
      });
  }
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError("Карточка с указанным _id не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InvalidRequestError());
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError("Карточка с указанным _id не найдена");
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new InvalidRequestError());
      }
    });
};
