const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');
const AuthError = require('../errors/authError');
const ConflictError = require('../errors/conflictError');
const RequestError = require('../errors/requestError');
const { secret } = require('../config');

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

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((user) => {
          const noPasswordUser = user.toObject({ useProjection: true });

          return res.status(201).send(noPasswordUser);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new RequestError('Переданы некорректные данные при создании пользователя.'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с указанным e-mail уже зарегистрирован.'));
          }
          return next(err);
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return changeUserData(req.user._id, { name, email }, res, next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthError('Неправильные почта или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthError('Неправильные почта или пароль.'));
          }

          const token = jwt.sign(
            { _id: user._id },
            secret,
            { expiresIn: '7d' },
          );

          return res.send({ token });
        });
    })

    .catch(next);
};
