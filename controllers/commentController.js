const Comment = require('../models/commentModel');
const factory = require('./handlerFactory');

exports.postComment = factory.createOne(Comment);

exports.getAllComments = factory.getAll(Comment);

exports.getSpecificComment = factory.getOne(Comment);

exports.updateComment = factory.updateOne(Comment);

exports.deleteComment = factory.deleteOne(Comment);
