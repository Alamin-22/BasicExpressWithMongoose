import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';
const router = express.Router();

// create a middleware

router.post(
  '/create_academic_semester',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);
// get all semester
router.get(
  '/',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.supper_admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicSemesterControllers.getAllAcademicSemester,
);
// get single semester
router.get(
  '/:semesterId',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.supper_admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicSemesterControllers.getSingleAcademicSemester,
);

// update single semester
router.patch(
  '/:semesterId',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
