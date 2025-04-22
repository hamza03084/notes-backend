const express = require('express');
const router = express.Router();
const auth = require('./auth');
const notes = require('./notes');
const {authenticateUser} = require('../middleware/authMiddleware');

router.use('/auth', auth);
router.use('/notes', authenticateUser, notes);

module.exports = router;
