const Card = require('../models/card');
const { notFoundError } = require('../errors/notFoundError');
const { badRequestError } = require('../errors/badRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: cards });
    })
    .catch(next);
}


const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: card });
    })
    .catch(next);
}

const deleteCard = (req, res, next) => {
  Card.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}