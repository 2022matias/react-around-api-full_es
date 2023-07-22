const Card = require('../models/card');
const { notFoundError } = require('../errors/notFoundError');
const { badRequestError } = require('../errors/badRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: cards });
    })
    .catch(next);
}


module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  // console.log(owner);
  // const owner = "64bb191ec3cc4e4cdf573bbb";

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: card });
    })
    .catch(next);
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};