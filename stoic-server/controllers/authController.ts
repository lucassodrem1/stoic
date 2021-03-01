import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as userService from '../services/userServices';

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await userService.addUser(req);

    res.status(201).json({
      status: 'success',
      message: 'User added!',
      token: token,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await userService.login(req);

    res.status(201).json({
      status: 'success',
      message: 'User login!',
      token: token,
    });
  }
);
