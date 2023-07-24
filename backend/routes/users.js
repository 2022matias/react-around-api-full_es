const routerUser = require('express').Router();
const {
  getUser, getUserById, updateProfile, updateAvatar
} = require('../controllers/users');
const { createUser } = require('../controllers/createUser');
const { dataUser } = require('../controllers/dataUser');
const { auth } = require('../middleware/auth');

routerUser.get('/', getUser);
routerUser.get('/me', auth, dataUser);
routerUser.get('/:id', getUserById);
routerUser.post('/', createUser);
routerUser.patch('/me', auth, updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
