import { NextFunction, Request, response, Response } from 'express';
import * as db from '../db';
import catchAsync from '../utils/catchAsync';
import * as userService from '../services/userServices';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rows: users } = await db.query('SELECT * FROM users', []);

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUser(req);

    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
);
