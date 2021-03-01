import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import AppError from '../utils/AppError';

const sendDevError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const handleDuplicateFieldsDB = (err: any) => {
  const regex = /\(([^)]+)\)/;
  const matches = err.detail.match(regex);

  return new AppError(
    `${matches[1]} already exists! Please use another value!`,
    400
  );
};

const handleValidationErrorDB = (err: any) => {
  return new AppError(`Invalid input data: ${err.column}`, 400);
};

const handleGlobalError = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendDevError(err, res);

  if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    if (error.code === '23505') error = handleDuplicateFieldsDB(error);
    if (error.code === '23502') error = handleValidationErrorDB(error);

    sendProdError(error, res);
  }
};

export default handleGlobalError;
