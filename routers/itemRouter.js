const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router
  .route('/5-recent-lost-items')
  .get(itemController.aliasRecentItems, itemController.getAllItems);

router.route('/').post(itemController.postItem).get(itemController.getAllItems);

router.route('/all').get(itemController.readAll);

router
  .route('/:id')
  .get(itemController.getSpecificItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
