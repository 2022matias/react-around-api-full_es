const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { unauthorizedError } = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw unauthorizedError('Usuario no autorizado');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw unauthorizedError('Usuario no autorizado');
          }
          const payload = { _id: user._id };
          const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    });
};

module.exports = {
  login,
};
