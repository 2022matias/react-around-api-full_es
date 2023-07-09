const routerUser = require('express').Router();

const {
  getUser, createUser, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

routerUser.get('/', getUser);
routerUser.get('/:id', getUserById);
routerUser.post('/', createUser);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
