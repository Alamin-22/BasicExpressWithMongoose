import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const AuthValidationMiddleWare = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log({ token });
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Unauthorized!');
    }

    next();
  });
};

export default AuthValidationMiddleWare;
