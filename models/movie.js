const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
  },
  // director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
  },
  // duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
  },
  // year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: true,
  },
  // description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
  },
  // image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https', 'ftp'] }),
      message: 'Некорректная ссылка на постер к фильму',
    },
    required: true,
  },
  // trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https', 'ftp'] }),
      message: 'Некорректная ссылка на трейлер фильма',
    },
    required: true,
  },
  // thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка.
  // Запишите её URL-адресом.
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https', 'ftp'] }),
      message: 'Некорректная ссылка на миниатюрное изображение постера к фильму',
    },
    required: true,
  },
  // owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
  // Обязательное поле в формате number.
  movieId: {
    type: Number,
    required: true,
  },
  // nameRU — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
  },
  // nameEN — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
