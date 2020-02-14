const express = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const router = express.Router();
const User = require('../models/User');

const { protect, authorize } = require('../middleware/auth');
const advancedReults = require('../middleware/advancedResults');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedReults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
