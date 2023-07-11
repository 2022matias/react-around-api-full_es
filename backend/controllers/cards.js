const Card = require('../models/card');
const { notFoundError } = require('../errors/notFoundError');
const { badRequestError } = require('../errors/badRequestError');

// module.exports.getCards = (req, res) => {
//   Card.find({})
//     .then((cards) => res.send({ data: cards }))
//     .catch((err) => {
//       if (err.name === 'SomeErrorName') {
//         return res.status(400).send({ message: 'Se pasaron datos inválidos' });
//       }
//       res.status(500).send({ message: 'Error interno del servidor' });
//     });
// };
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: cards });
    })
    .catch(next);
}


module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: card });
    })
    .catch(next);
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        throw new notFoundError('Usuario no encontrado');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res) => {
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

module.exports.dislikeCard = (req, res) => {
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
