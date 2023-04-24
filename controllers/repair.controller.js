const Repair = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const { db } = require('./../database/config');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'This are all the pendings for repair',
    results: repairs.length,
    repairs,
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { date, motorsNumber, description, userId } = req.body;

  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'The repair task has been created!!',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  const { status } = req.body;

  //solo se cambia a status: completed
  await repair.update({
    status,
  });

  res.status(200).json({
    status: 'success',
    message: 'The repair task has been updated',
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The repair task has been deleted',
  });
});

exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  res.status(200).json({
    status: 'succes',
    message: 'The query has benn done successfully',
    repair,
  });
});
