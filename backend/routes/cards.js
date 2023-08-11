const routerCards = require('express').Router();
const { auth } = require('../middleware/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/', auth, getCards);
routerCards.post('/', auth, createCard);
routerCards.delete('/:id', auth, deleteCard);
routerCards.put('/:id/likes', auth, likeCard);
routerCards.delete('/:id/likes', auth, dislikeCard);

module.exports = routerCards;
