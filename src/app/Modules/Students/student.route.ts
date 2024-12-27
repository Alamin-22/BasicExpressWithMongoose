import express from 'express';
import { studentControllers } from './student.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get('/:id', studentControllers.getSingleStudent);
// to delete student
router.patch(
  '/:id',
  ValidateRequestMiddleWare(StudentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
);
// update
router.delete('/:id', studentControllers.deleteStudent);

export const StudentRoutes = router;
