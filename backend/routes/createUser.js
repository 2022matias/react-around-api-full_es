const routerCreateUser = require('express').Router();
const { createUser } = require('../controllers/createUser');

routerCreateUser.post('/', createUser);

module.exports = routerCreateUser;