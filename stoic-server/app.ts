import express from 'express';
import morgan from 'morgan';
import handleGlobalError from './controllers/errorController';
import userRouter from './routes/userRouter';
import AppError from './utils/AppError';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(handleGlobalError);

export default app;
