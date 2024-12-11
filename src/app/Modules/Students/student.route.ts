import express from 'express';
import { studentControllers } from './student.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get('/:studentId', studentControllers.getSingleStudent);
// to delete student
router.patch(
  '/:studentId',
  ValidateRequestMiddleWare(StudentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
);
// update
router.delete('/:studentId', studentControllers.deleteStudent);

export const StudentRoutes = router;
