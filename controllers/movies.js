const Movie = require('../models/movie');

const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const RequestError = require('../errors/requestError');

module.exports.getMovies = (req, res, next) => {
  const currentUserId = req.user._id;

  Movie.find({ owner: currentUserId })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))

    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const currentUserId = req.user._id;

  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      const ownerId = movie.owner.toString();
      if (ownerId !== currentUserId) {
        throw new ForbiddenError('Вы не автор этой карточки.');
      }
      return movie;
    })
    .then((movie) => movie.deleteOne())
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточка с указанным id не найдена.'));
      }
      if (err.name === 'CastError') {
        return next(new RequestError('Передан некорректный id карточки.'));
      }
      return next(err);
    });
};
