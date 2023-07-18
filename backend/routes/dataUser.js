const routerDataUser = require('express').Router();

const { dataUser } = require('../controllers/dataUser');
const auth = require('../middleware/auth');

routerDataUser.get('/', auth, dataUser);

module.exports = routerDataUser;