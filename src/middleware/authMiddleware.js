const jwt = require('jsonwebtoken');
const {tokenVariable} = require('../constants/auth');

const authenticateUser = (req, res, next) => {
  const token = req.cookies[tokenVariable];

  if (!token) {
    return res.status(401).json({message: 'Not authenticated. Token missing.'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: 'Invalid or expired token.'});
  }
};

module.exports = {authenticateUser};
