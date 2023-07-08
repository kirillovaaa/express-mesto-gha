const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  login,
  createUser,
} = require('../controllers/auth');

const authCelebrator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

router.post('/signin', authCelebrator, login);
router.post('/signup', authCelebrator, createUser);
