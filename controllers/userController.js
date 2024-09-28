const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.readAllUsers = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.readSpecificUser = factory.getOne(User);

exports.deleteSpecificUser = factory.deleteOne(User);

exports.updateSpecificUser = factory.updateOne(User);
