const User = require('../../models/userModel');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {tokenVariable} = require('../../constants/auth');

const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  const {password, ...userResponse} = user._doc;
  res.status(201).json(userResponse);
});

const login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    return next(new AppError('Invalid email or password.', 401));
  }
  const token = jwt.sign(
    {id: user.id, username: user.name, email: user.email},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  // Set cookie
  res.cookie(tokenVariable, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  const {password: pwd, ...userInfo} = user._doc;

  res.status(200).json({message: 'Login successful', userInfo});
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie(tokenVariable, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({message: 'Logout successful'});
});

module.exports = {createUser, login, logout};
