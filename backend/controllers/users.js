const User = require('../models/user');
const { notFoundError } = require('../errors/notFoundError');

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw notFoundError('Usuarios no encontrados');
      }
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw notFoundError('Usuario no encontrado');
      }
      res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw notFoundError('Usuario no encontrado');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUser,
  getUserById,
  updateProfile
}