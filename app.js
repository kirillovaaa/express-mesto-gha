const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authMiddleware
app.use((req, res, next) => {
  req.user = {
    _id: "649d2403aebd5b11db813f0e",
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
