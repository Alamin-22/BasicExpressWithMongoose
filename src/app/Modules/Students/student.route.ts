import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

router.post('/create_student', studentControllers.createStudent);

router.get('/get_all_students', studentControllers.getAllStudents);

router.get('/get_all_students/:studentId', studentControllers.getSingleStudent);

export const StudentRoutes = router;
