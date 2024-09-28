const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email!'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
