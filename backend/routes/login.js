const routerLogin = require('express').Router();
const { login } = require('../controllers/login');

routerLogin.post('/', login);

module.exports = routerLogin;