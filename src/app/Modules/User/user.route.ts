import express from 'express';
import { userControllers } from './user.controller';
import { StudentValidations } from '../Students/student.validation';
import ValidateHRequestMiddleWare from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../FacultyMember/facultyMember.validation';
import { createAdminValidationSchema } from '../AdminMember/adminMember.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// create a middleware

router.post(
  '/create_student',
  AuthValidationMiddleWare(USER_ROLE.admin),
  ValidateHRequestMiddleWare(StudentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create_faculty',
  ValidateHRequestMiddleWare(createFacultyValidationSchema),
  userControllers.createFaculty,
);
router.post(
  '/create_admin',
  ValidateHRequestMiddleWare(createAdminValidationSchema),
  userControllers.createAdmin,
);

router.get(
  '/get_me',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  userControllers.getMe,
);

export const userRoutes = router;
