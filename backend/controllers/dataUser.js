const User = require('../models/user');
const { badRequestError } = require('../errors/badRequestError');

const dataUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new badRequestError('La solicitud enviada es incorrecta');
      }
      res.send(user);
    })
    .catch(next);
}

module.exports = {
  dataUser
}

// const getUserMeController = (req, res, next) => {
//   User.findById(req.user._id)
//     .orFail()
//     .then((user) => {
//       if (!user) {
//         const err = new Error("ID de usuario no encontrado");
//         err.statusCode = 404;
//         next(err);
//         return;
//       }
//       res.send({ user: user });
//     })
//     .catch(() => {
//       const err = new Error("ID de usuario no valido");
//       err.statusCode = 400;
//       next(err);
//     });
// };