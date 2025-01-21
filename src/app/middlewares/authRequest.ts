import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const AuthValidationMiddleWare = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log({ token });

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Unauthorized!');
    }
    // invalid token
    jwt.verify(token, config.access_secret as string, function (err, decoded) {
      // err
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Unauthorized!');
      }
      // decoded undefined
      console.log({ decoded });
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default AuthValidationMiddleWare;
