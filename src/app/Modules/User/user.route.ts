import express from 'express';
import { userControllers } from './user.controller';
import { StudentValidations } from '../Students/student.validation';
import ValidateHRequestMiddleWare from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../FacultyMember/facultyMember.validation';
import { createAdminValidationSchema } from '../AdminMember/adminMember.validation';
const router = express.Router();

// create a middleware

router.post(
  '/create_student',
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

export const userRoutes = router;
