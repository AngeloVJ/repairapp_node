const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const repairRouter = require('./routes/repair.routes');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
