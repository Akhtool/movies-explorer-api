const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');

const findUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      return next(err);
    });
};

const changeUserData = (id, newData, res, next) => {
  User.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => findUser(req.user._id, res, next);

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return changeUserData(req.user._id, { name, about }, res, next);
};
