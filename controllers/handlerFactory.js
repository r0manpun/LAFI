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
    const items = await Model.find();
    res.status(200).json({
      status: 'success',
      message: `all doc/data loaded`,
      data: {
        items,
      },
    });
  };
};
