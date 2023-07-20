const routerUser = require('express').Router();
const {
  getUser, getUserById, updateProfile, updateAvatar
} = require('../controllers/users');
const { createUser } = require('../controllers/createUser');
const { dataUser } = require('../controllers/dataUser');

routerUser.get('/', getUser);
routerUser.get('/me', dataUser);
routerUser.get('/:id', getUserById);
routerUser.post('/', createUser);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
