const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const api = require('./api');
const globalErrorHandler = require('./handler/errorHandler');

const app = express();

app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running...',
  });
});

app.use('/api', api);
app.use(globalErrorHandler);

module.exports = app;
