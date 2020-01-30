const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res
      .status(201)
      .json({ success: true, count: bootcamp.length, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps/:id
// @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res
      .status(201)
      .json({ success: true, count: bootcamp.length, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete bootcamp
// @route Delete /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(201).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
