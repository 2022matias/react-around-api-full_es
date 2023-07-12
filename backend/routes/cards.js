const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/', getCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
routerCards.delete('/:id', deleteCard);
routerCards.put('/:id/likes', likeCard);
routerCards.delete('/:id/likes', dislikeCard);

module.exports = routerCards;