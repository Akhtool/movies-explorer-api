require('dotenv').config();

const { secretPhrase } = require('./utils/constants');

const {
  NODE_ENV = 'dev',
  JWT_SECRET,
  PORT = 3000,
  DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const secret = NODE_ENV === 'production' ? JWT_SECRET : secretPhrase;

module.exports = {
  PORT,
  DB_URI,
  secret,
};
