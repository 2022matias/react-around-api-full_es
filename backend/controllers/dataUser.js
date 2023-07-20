const User = require('../models/user');
const { badRequestError } = require('../errors/badRequestError');

const dataUser = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send(user);
    })
    .catch(next);
}

module.exports = {
  dataUser
}