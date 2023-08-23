const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { notFoundError } = require('../errors/notFoundError');
const { badRequestError } = require('../errors/badRequestError');

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

const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ user });
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

  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw notFoundError('Usuario no encontrado');
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw badRequestError('La solicitud enviada es incorrecta');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getUserById,
  updateProfile,
  getUserData,
  createUser,
};
