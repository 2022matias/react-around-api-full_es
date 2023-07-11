const routerDataUser = require('express').Router();

const { dataUser } = require('../controllers/dataUser');

routerDataUser.get('/', dataUser);

module.exports = routerDataUser;

