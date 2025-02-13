import express from 'express';
import { studentControllers } from './student.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';
const router = express.Router();

router.get(
  '/',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.faculty),
  studentControllers.getAllStudents,
);

router.get(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  studentControllers.getSingleStudent,
);
// to delete student
router.patch(
  '/:id',
  ValidateRequestMiddleWare(StudentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
);
// update
router.delete('/:id', studentControllers.deleteStudent);

export const StudentRoutes = router;
