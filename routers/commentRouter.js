const { Router } = require('express');
const commentController = require('../controllers/commentController');

const router = Router();

router
  .route('/')
  .post(commentController.createcomment)
  .get(commentController.getAllComments);

router
  .route('/:id')
  .get(commentController.getSpecificComment)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
