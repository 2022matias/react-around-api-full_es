const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
require('dotenv').config();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');


const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(bodyParser.json());

app.use(requestLogger);
// const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const routerLogin = require('./routes/login');
const routerCreateUser = require('./routes/createUser');
const routerDataUser = require('./routes/dataUser');

app.use(express.urlencoded({ extended: true }));
app.use('/signin', routerLogin);
app.use('/signup', routerCreateUser);
app.use('/cards', auth, routerCards);
app.use('/users/me', auth, routerDataUser);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Se ha producido un error en el servidor'
      : message
  });
});

app.listen(PORT);
