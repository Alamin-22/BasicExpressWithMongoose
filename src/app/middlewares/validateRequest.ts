import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const ValidateRequestMiddleWare = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //  validation using Zod and if everything alright then next will be proceed
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default ValidateRequestMiddleWare;
