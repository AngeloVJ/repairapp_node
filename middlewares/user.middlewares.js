const User = require('../models/user.model');

exports.validUsers = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'the name is require',
    });
  }
  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'the email is require',
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 'error',
      message: 'the password is require',
    });
  }
  if (!role) {
    return res.status(400).json({
      status: 'error',
      message: 'the role is require',
    });
  }

  next();
};

exports.validUsersUpdate = (req, res, next) => {
  const { name, email } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'the name is require',
    });
  }
  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'the email is require',
    });
  }

  next();
};

exports.validExistUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user id: ${id} has not been found`,
    });
  }

  req.user = user;
  next();
};
