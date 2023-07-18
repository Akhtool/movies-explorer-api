const { celebrate, Joi } = require('celebrate');

const linkPattern = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

const createUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkPattern),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const createMovieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkPattern),
    trailerLink: Joi.string().required().pattern(linkPattern),
    thumbnail: Joi.string().required().pattern(linkPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const checkMovieIdJoi = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserJoi,
  loginJoi,
  updateUserJoi,
  createMovieJoi,
  checkMovieIdJoi,
};
