const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const NotFoundError = require('../errors/notFoundError');

const moviesRouter = require('./movies');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Запись не найдена.')));

module.exports = router;
