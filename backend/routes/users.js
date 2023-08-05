const routerUser = require('express').Router();
const {
  getUser, getUserById, updateProfile, getUserData, createUser,
} = require('../controllers/users');
const { auth } = require('../middleware/auth');

routerUser.get('/', getUser);
routerUser.get('/me', auth, getUserData);
routerUser.get('/:id', auth, getUserById);
routerUser.post('/', createUser);
routerUser.patch('/me', auth, updateProfile);

module.exports = routerUser;
