/**
 *
 * @param {object} Model - object that is saved in the database
 * @returns fn - an async middleware function to create a document
 */
exports.createOne = (Model) => {
  return async (req, res, next) => {
    const item = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      message: `doc created`,
      data: {
        item,
      },
    });
  };
};

/**
 *
 * @param {object} Model - object that is saved in the database
 * @returns fn - an async middleware function to delete one document
 */
exports.deleteOne = (Model) => {
  return async (req, res, next) => {
    const item = await Model.findByIdAndDelete(req.params.id, { new: true });
    res.status(200).json({
      status: 'success',
      message: `doc deleted`,
      data: null,
    });
  };
};

/**
 *
 * @param {object} Model - object that is saved in the database
 * @returns fn - an async middleware function to update one document
 */
exports.updateOne = (Model) => {
  return async (req, res, _next) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      message: `doc updated`,
      data: {
        item,
      },
    });
  };
};

/**
 *
 * @param {object} Model - object that is saved in the database
 * @returns fn - an async middleware function to read one document
 */
exports.getOne = (Model) => {
  return async (req, res, _next) => {
    const item = await Model.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: `specific doc/data `,
      data: {
        item,
      },
    });
  };
};

/**
 *
 * @param {object} Model - object that is saved in the database
 * @returns fn - an async middleware function to read all documents
 */
exports.getAll = (Model) => {
  return async (req, res, _next) => {
    try {
      // destructuring req.query to make a copy object
      const queryObj = { ...req.query };
      // creating an array of fields that are to be excluded
      const excludedFields = ['limit', 'fields', 'sort', 'page'];
      // looping the excludedFields so we can delete them from queryObj
      excludedFields.forEach((el) => delete queryObj[el]);

      let query = Model.find(queryObj);

      // Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      // Field Limiting
      if (req.query.fields) {
        const fields = req.query?.fields?.split(',').join(' ');
        query = query.select(fields);
      } else {
        query = query.select('-__v');
      }

      // Pagination
      const limit = req.query.limit * 1 || 5;
      const page = req.query.page * 1 || 1;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      if (req.query.page) {
        const numItems = await Model.countDocuments();
        if (skip >= numItems) throw new Error('This page does not exist!!');
      }

      const items = await query;
      console.log(items);

      res.status(200).json({
        status: 'success',
        totalResults: items.length,
        message: `all doc/data loaded`,
        data: {
          items,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
};
