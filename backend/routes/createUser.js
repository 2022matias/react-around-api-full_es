const routerCreateUser = require('express').Router();
const { createUser } = require('../controllers/createUser');
const { celebrate, Joi } = require('celebrate');

routerCreateUser.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}), createUser);

module.exports = routerCreateUser;