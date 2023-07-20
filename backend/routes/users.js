const routerUser = require('express').Router();
const {
  getUser, getUserById, updateProfile, updateAvatar
} = require('../controllers/users');
const { createUser } = require('../controllers/createUser');

routerUser.get('/', getUser);
routerUser.get('/:id', getUserById);
routerUser.post('/', createUser);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
