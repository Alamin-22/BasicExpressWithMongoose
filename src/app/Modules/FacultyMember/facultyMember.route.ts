import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './facultyMember.controller';
import { updateFacultyValidationSchema } from './facultyMember.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
