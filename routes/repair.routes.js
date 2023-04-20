const express = require('express');
//controllers
const repairsController = require('./../controllers/repair.controller');
//middlewares
const repairsMiddleware = require('./../middlewares/repair.middlewares');
const usersMiddleware = require('./../middlewares/user.middlewares');
const validationMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.use(usersMiddleware.protect);

router
  .route('/')
  .get(usersMiddleware.restrictTo('employee'), repairsController.findAllRepairs)
  .post(
    validationMiddleware.createRepairValidation,
    repairsController.createRepair
  );

router
  .route('/:id')
  .get(
    repairsMiddleware.validExistRepair,
    usersMiddleware.restrictTo('employee'),
    repairsController.findOneRepair
  )
  .patch(
    repairsMiddleware.validExistRepair,
    validationMiddleware.updateRepairValidation,
    usersMiddleware.restrictTo('employee'),
    repairsController.updateRepair
  )
  .delete(
    repairsMiddleware.validExistRepair,
    usersMiddleware.restrictTo('employee'),
    repairsController.deleteRepair
  );

module.exports = router;
