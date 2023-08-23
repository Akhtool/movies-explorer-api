const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { createMovieJoi, checkMovieIdJoi } = require('../middlewares/celebrate');

// возвращает все сохранённые текущим  пользователем фильм
moviesRouter.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
moviesRouter.post('/', createMovieJoi, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:_id', checkMovieIdJoi, deleteMovie);

module.exports = moviesRouter;
