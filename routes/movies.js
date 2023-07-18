const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильм
moviesRouter.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
moviesRouter.post('/', createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:_id', deleteMovie);

module.exports = moviesRouter;
