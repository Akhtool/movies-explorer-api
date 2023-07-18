const usersRouter = require('express').Router();
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
usersRouter.get('/me', getCurrentUser);

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
usersRouter.patch('/me', updateUser);

module.exports = usersRouter;
