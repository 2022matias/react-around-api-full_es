const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { notFoundError } = require('../errors/notFoundError');
const { badRequestError } = require('../errors/badRequestError');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!card) {
        throw new notFoundError('Usuario no encontrado');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new badRequestError('La solicitud enviada es incorrecta');
          }
          const payload = { _id: user._id };
          const { NODE_ENV, JWT_SECRET } = process.env;
          const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    });
}