import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUser } from '../Modules/User/user.interface';

const AuthValidationMiddleWare = (...requiredRoles: TUser[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Unauthorized!');
    }
    // invalid token
    jwt.verify(token, config.access_secret as string, function (err, decoded) {
      // err
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Unauthorized!');
      }

      const userRole = (decoded as JwtPayload)?.role;

      // checking the Role of the User
      if (requiredRoles && !requiredRoles.includes(userRole)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Your Are Unauthorized!');
      }

      // decoded undefined
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default AuthValidationMiddleWare;
