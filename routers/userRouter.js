const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router
  .route('/')
  .post(userController.createUser)
  .get(userController.readAllUsers);

router
  .route('/:id')
  .get(userController.readSpecificUser)
  .patch(userController.updateSpecificUser)
  .delete(userController.deleteSpecificUser);

module.exports = router;
