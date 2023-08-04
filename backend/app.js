const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const allowedCors = [
  'https://mati-sprint16.chickenkiller.com',
  'http://mati-sprint16.chickenkiller.com',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001'
];

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
app.use(bodyParser.json());

app.use(function (req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(cors());
app.options('*', cors());
app.use(requestLogger);
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const routerLogin = require('./routes/login');
const routerCreateUser = require('./routes/createUser');

app.use(express.urlencoded({ extended: true }));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});
app.use('/signin', routerLogin);
app.use('/signup', routerCreateUser);
app.use('/users', routerUser);
app.use('/cards', routerCards);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? message
      : message
  });
});

app.listen(PORT);
