const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Usuario o contraseña incorrecta' });
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(400).json({ message: 'usuario o contraseña incorrecta' });
          }
          const payload = { _id: user._id };
          const { NODE_ENV, JWT_SECRET } = process.env;
          const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch((err) => {
          res.status(401).send({ message: err.message });
        });
    });
}