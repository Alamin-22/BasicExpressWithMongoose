import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();

router.post('/create_student', studentControllers.createStudent);

export const StudentRoutes = router;
