// const User = require('../models/user');

// module.exports.getUser = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       if (err.name === 'SomeErrorName') {
//         return res.status(400).send({ message: 'Se pasaron datos inválidos' });
//       }
//       res.status(500).send({ message: 'Error interno del servidor' });
//     });
// };

// module.exports.getUserById = (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       if (err.name === 'SomeErrorName') {
//         return res.status(400).send({ message: 'Se pasaron datos inválidos' });
//       }
//       if (!user) {
//         return res.status(404).send({ message: 'Usuario no encontrado' });
//       }
//       res.send(user);
//     })
//     .catch((err) => res.status(500).send({ message: 'Error interno del servidor' }));
// };


// module.exports.updateProfile = (req, res) => {
//   const { name, about } = req.body;

//   User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
//     .then((user) => {
//       if (err.name === 'SomeErrorName') {
//         return res.status(400).send({ message: 'Se pasaron datos inválidos' });
//       }
//       if (!user) {
//         return res.status(404).send({ message: 'Usuario no encontrado' });
//       }
//       res.send(user);
//     })
//     .catch((err) => res.status(500).send({ message: 'Error interno del servidor' }));
// };

// module.exports.updateAvatar = (req, res) => {
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
//     .then((user) => {
//       if (err.name === 'SomeErrorName') {
//         return res.status(400).send({ message: 'Se pasaron datos inválidos' });
//       }
//       if (!user) {
//         return res.status(404).send({ message: 'Usuario no encontrado' });
//       }
//       res.send(user);
//     })
//     .catch((err) => res.status(500).send({ message: 'Error interno del servidor' }));
// };