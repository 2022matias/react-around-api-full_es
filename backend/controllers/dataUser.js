const User = require('../models/user');
const { badRequestError } = require('../errors/badRequestError');

module.exports.dataUser = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send(users);
    })
    .catch(next);
}