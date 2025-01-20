import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  ValidateRequestMiddleWare(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
