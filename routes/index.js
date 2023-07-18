const router = require('express').Router();
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const NotFoundError = require('../errors/notFoundError');

const moviesRouter = require('./movies');
const usersRouter = require('./users');

const { login, createUser } = require('../controllers/users');
const { createUserJoi, loginJoi } = require('../middlewares/celebrate');
const authMiddleware = require('../middlewares/auth');
const { errorLogger } = require('../middlewares/logger');

router.post('/signin', loginJoi, login);
router.post('/signup', createUserJoi, createUser);

router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Запись не найдена.')));
router.use(errorLogger);
router.use(errors({ message: 'Ошибка валидации данных!' }));

module.exports = router;
