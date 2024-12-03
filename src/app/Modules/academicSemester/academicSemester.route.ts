import express from 'express';
import { StudentValidations } from '../Students/student.validation';
import ValidateHRequestMiddleWare from '../../middlewares/validateRequest';
import { academicSemesterControllers } from './academicSemester.controller';
const router = express.Router();

// create a middleware

router.post(
  '/create_academicSemester',
  ValidateHRequestMiddleWare(StudentValidations.createStudentValidationSchema),
  academicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
