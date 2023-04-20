const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('./../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully!',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.findAllUsers = catchAsync(async (req, res) => {
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
});

exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'succes',
    message: 'The query has benn done successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
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
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});

// exports.createUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const user = await User.create({
//     name,
//     email,
//     password,
//     role,
//   });

//   res.status(201).json({
//     status: 'success',
//     message: 'The user has been created!!',
//     user,
//   });
// };
