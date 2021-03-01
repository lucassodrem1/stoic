import { Request, Response, NextFunction } from 'express';

const catchAsync = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fn(req, res, next).catch((err: Error) => next(err));
};

export default catchAsync;
