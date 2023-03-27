const express = require('express');
const repairsController = require('./../controllers/repair.controller');
const repairsMiddleware = require('./../middlewares/repair.middlewares');

const router = express.Router();

router
  .route('/')
  .get(repairsController.findAllRepairs)
  .post(
    repairsMiddleware.validRepairs,
    repairsController.createRepair
  );

router
  .route('/:id')
  .get(repairsMiddleware.validExistRepair)
  .patch(
    repairsMiddleware.validRepairsUpdate,
    repairsMiddleware.validExistRepair,
    repairsController.updateRepair
  )
  .delete(
    repairsMiddleware.validExistRepair,
    repairsController.deleteRepair
  );

module.exports = router;
