const Item = require('../models/itemModel');
const factory = require('./handlerFactory');

exports.postItem = factory.createOne(Item);

exports.getAllItems = factory.getAll(Item);

exports.getSpecificItem = factory.getOne(Item);

exports.updateItem = factory.updateOne(Item);

exports.deleteItem = factory.deleteOne(Item);

// const queryObj = { ...this.queryString };
// const excludedFields = ['page', 'sort', 'limit', 'fields', 'select'];
// excludedFields.forEach((el) => delete queryObj[el]);
// // Advance Filtering
// let queryStr = JSON.stringify(queryObj);

// queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

// this.query = this.query.find(JSON.parse(queryStr));

exports.readAll = async (req, res, next) => {
  // filter data using query string ()
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'limit', 'fields', 'sort'];
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log(queryObj);
  // advance filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;

  const items = await Item.find()
    .select(req.query.fields.split(',').join(' '))
    .sort(req.query?.sort?.split(',').join(' '))
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(200).json({
    status: 'success',
    message: `all doc/data loaded`,
    data: {
      items,
    },
  });
};

exports.aliasRecentItems = async (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-dateFound';
  req.query.fields = 'name,location, dateFound, description';
  next(); 
  // this is used to prefill the query before it reaches the getAllItems handler
};
