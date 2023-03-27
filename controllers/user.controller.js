const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'This are all the avaible users',
    results: users.length,
    users,
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created!!',
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  //solo se puede actualizar name, email
  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
};

exports.deleteUser = async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
};

exports.findOneUser = async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'succes',
    message: 'The query has benn done successfully',
    user,
  });
};
