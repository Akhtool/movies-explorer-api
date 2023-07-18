const usersRouter = require('express').Router();
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

const { updateUserJoi } = require('../middlewares/celebrate');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me
usersRouter.get('/me', getCurrentUser);

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
usersRouter.patch('/me', updateUserJoi, updateUser);

module.exports = usersRouter;
