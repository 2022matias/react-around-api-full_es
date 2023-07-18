const User = require('../models/user');
const { badRequestError } = require('../errors/badRequestError');

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, hash }))
    .then((user) => {
      if (!user) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: user });
    })
    .catch(next);
}

module.exports = { createUser };