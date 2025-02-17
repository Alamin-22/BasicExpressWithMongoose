import express from 'express';
import { studentControllers } from './student.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';
const router = express.Router();

router.get(
  '/',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.supper_admin,
  ),
  studentControllers.getAllStudents,
);

router.get(
  '/:id',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.supper_admin,
  ),
  studentControllers.getSingleStudent,
);
// update
router.patch(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.student, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(StudentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
);

// to delete student
router.delete(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  studentControllers.deleteStudent,
);

export const StudentRoutes = router;
