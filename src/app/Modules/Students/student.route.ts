import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

router.get('/get_all_students', studentControllers.getAllStudents);

router.get('/get_all_students/:studentId', studentControllers.getSingleStudent);
// to delete student
router.delete('/get_all_students/:studentId', studentControllers.deleteStudent);

export const StudentRoutes = router;
