const express = require('express');
const {createUser, login, logout} = require('./authController');
const validateBodyMiddleware = require('../../middleware/validateBodyMiddleware');
const {
  validateCreateRequest,
  validateLoginRequest,
} = require('../../schemas/usersSchema');
const router = express.Router();
router.post(
  '/register',
  validateBodyMiddleware({validateFunction: validateCreateRequest}),
  createUser
);
router.post(
  '/login',
  validateBodyMiddleware({validateFunction: validateLoginRequest}),
  login
);

router.post('/logout', logout);

module.exports = router;
