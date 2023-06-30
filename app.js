const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { errorMiddleware } = require("./middlewares/error");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { NotFoundError } = require("./errors/NotFoundError");

const app = express();
const port = 3000;

// подключаемся к БД
mongoose.connect("mongodb://localhost:27017/mestodb");

// подключаем json парсер
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// хардкодим пользовательский токен
app.use((req, res, next) => {
  req.user = {
    _id: "649d2403aebd5b11db813f0e",
  };
  next();
});

// роутеры
app.use(usersRouter);
app.use(cardsRouter);

// обработка роута "*" - ошибка 404
app.use((req, res, next) => {
  next(new NotFoundError());
});

// отлов ошибки
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
