import express from 'express';
import { SemesterRegistrationControllers } from './SemesterRegistration.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './SemesterRegistration.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();
// crate Registration
router.post(
  '/create_semester_registration',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

// get all Registered info
router.get(
  '/',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  SemesterRegistrationControllers.getAllSemesterRegistrations,
);

// get Single Registered info
router.get(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);
// UPdate Single Registered info
router.patch(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
