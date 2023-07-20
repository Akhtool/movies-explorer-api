const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, DB_URI } = require('./config');

const app = express();

const catchErrorsMiddleware = require('./middlewares/catchErrors');
const { requestLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://akhtool.movies.nomoredomains.xyz',
  'http://akhtool.movies.nomoredomains.xyz',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());

mongoose.connect(DB_URI, {});

app.use(requestLogger); // логгер запросов

app.use(cors(corsOptions));

app.use('/', require('./routes/index'));

app.use(catchErrorsMiddleware);

app.listen(PORT, () => {});
