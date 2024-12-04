import express from 'express';
import { userControllers } from './user.controller';
import { StudentValidations } from '../Students/student.validation';
import ValidateHRequestMiddleWare from '../../middlewares/validateRequest';
const router = express.Router();

// create a middleware

router.post(
  '/create_student',
  ValidateHRequestMiddleWare(StudentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

export const userRoutes = router;
