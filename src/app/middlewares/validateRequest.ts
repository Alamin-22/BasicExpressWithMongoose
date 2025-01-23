import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const ValidateRequestMiddleWare = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //  validation using Zod and if everything alright then next will be proceed

    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default ValidateRequestMiddleWare;
