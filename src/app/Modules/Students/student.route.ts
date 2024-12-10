import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

router.get('/', studentControllers.getAllStudents);

router.get('/:studentId', studentControllers.getSingleStudent);
// to delete student
router.delete('/:studentId', studentControllers.updateStudent);
// update
router.patch('/:studentId', studentControllers.deleteStudent);

export const StudentRoutes = router;
