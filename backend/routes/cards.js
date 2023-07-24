const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middleware/auth');
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

routerCards.get('/', auth, getCards);
// routerCards.post('/', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required(),
//   }),
// }), createCard);
routerCards.post('/', auth, createCard);
routerCards.delete('/:id', auth, deleteCard);
routerCards.put('/:id/likes', auth, likeCard);
routerCards.delete('/:id/likes', auth, dislikeCard);

module.exports = routerCards;