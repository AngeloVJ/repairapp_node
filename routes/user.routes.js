const express = require('express');
const usersController = require('./../controllers/user.controller');
const usersMiddleware = require('./../middlewares/user.middlewares');

const router = express.Router();

router
  .route('/')
  .get(usersController.findAllUsers)
  .post(usersMiddleware.validUsers, usersController.createUser);

router
  .route('/:id')
  .get(usersMiddleware.validExistUser, usersController.findOneUser)
  .patch(usersMiddleware.validExistUser, usersController.updateUser)
  .delete(usersMiddleware.validExistUser, usersController.deleteUser);

module.exports = router;
