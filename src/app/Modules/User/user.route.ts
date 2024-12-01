import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

// create a middleware

const shenaBahini = (req: Request, res: Response, next: NextFunction) => {
  console.log('This ARmy dorja khol');
  next();
};

router.post('/create_student', shenaBahini, userControllers.createStudent);

export const userRoutes = router;
