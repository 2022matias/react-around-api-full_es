const User = require('../models/user');

module.exports.createUser = (req, res) => {
const { name, about, avatar, email, password } = req.body;

bcrypt.hash(password, 10)
  .then((hash) => User.create({ name, about, avatar, email, hash }))
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'SomeErrorName') {
      return res.status(400).send({ message: 'Se pasaron datos inválidos' });
    }
    res.status(500).send({ message: 'Error interno del servidor' });
  });
};