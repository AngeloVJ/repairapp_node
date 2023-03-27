const Repair = require('../models/repair.model');

exports.validRepairs = (req, res, next) => {
  const { date, userid } = req.body;

  if (!date) {
    return res.status(400).json({
      status: 'error',
      message: 'the date is require',
    });
  }
  if (!userid) {
    return res.status(400).json({
      status: 'error',
      message: 'the user ID is require',
    });
  }

  next();
};

exports.validRepairsUpdate = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      status: 'error',
      message: 'The status is require',
    });
  }

  next();
};

exports.validExistRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `The Repair id: ${id} has not been found`,
    });
  }

  req.repair = repair;
  next();
};
