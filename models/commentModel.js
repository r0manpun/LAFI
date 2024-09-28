const { default: mongoose } = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: [true, 'a comment cannot be empty!!'] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  review: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: [true, 'a comment must belong to a item'],
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
