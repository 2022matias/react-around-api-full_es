const User = require('../models/user');

module.exports.dataUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(400).send({ message: 'Se pasaron datos inválidos' });
      }
      res.status(500).send({ message: 'Error interno del servidor' });
    });
};