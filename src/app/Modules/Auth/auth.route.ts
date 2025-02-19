import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/login',
  ValidateRequestMiddleWare(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change_password',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.supper_admin,
  ),
  ValidateRequestMiddleWare(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forget_password',
  ValidateRequestMiddleWare(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset_password',
  ValidateRequestMiddleWare(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.restPassword,
);

router.post(
  '/refresh_token',
  ValidateRequestMiddleWare(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
