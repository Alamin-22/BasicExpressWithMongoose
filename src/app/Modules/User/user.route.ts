import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/create_student', userControllers.createStudent);

export const userRoutes = router;
