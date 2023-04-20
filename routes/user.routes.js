const express = require('express');
//controladores
const usersController = require('./../controllers/user.controller');
//middlewares
const usersMiddleware = require('./../middlewares/user.middlewares');
const validations = require('./../middlewares/validations.middleware');

const router = express.Router();

//user signup, login
router.post(
  '/signup',
  validations.signupUserValidation,
  usersController.signup
);
router.post('/login', validations.loginUserValidation, usersController.login);

//user get, patch, delete
router.use(usersMiddleware.protect);

router.route('/').get(usersController.findAllUsers);
//.post(usersMiddleware.validUsers, usersController.createUser);

router
  .route('/:id')
  .get(usersMiddleware.validExistUser, usersController.findOneUser)
  .patch(
    usersMiddleware.validExistUser,
    validations.updateUserValidation,
    usersMiddleware.protectAccountOwner,
    usersController.updateUser
  )
  .delete(
    usersMiddleware.validExistUser,
    usersMiddleware.protectAccountOwner,
    usersController.deleteUser
  );

module.exports = router;
