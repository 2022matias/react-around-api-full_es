const routerLogin = require('express').Router();
const { login } = require('../controllers/login');
const { celebrate, Joi } = require('celebrate');

routerLogin.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = routerLogin;