const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Se pasaron datos inválidos' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Se pasaron datos inválidos' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Se pasaron datos inválidos' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Se pasaron datos inválidos' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Se pasaron datos inválidos' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};
