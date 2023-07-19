const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { notFoundError } = require('../errors/notFoundError');
const { unauthorizedError } = require('../errors/unauthorizedError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new notFoundError('Usuario no encontrado');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new unauthorizedError('Usuario no autorizado');
          }
          const payload = { _id: user._id };
          const { NODE_ENV, JWT_SECRET } = process.env;
          const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    });
}