const { default: mongoose } = require('mongoose');

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateFound: {
    type: Date,
    required: true,
  },
  images: [String],
  location: {
    type: String,
  },
});

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
