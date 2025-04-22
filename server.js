require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./src/app');
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('DB Connection Successful!');
  })
  .catch((error) => {
    console.log(error, 'err');
  });

const Port = process.env.PORT;
app.listen(Port, console.log(`Server is running ${Port}`));
