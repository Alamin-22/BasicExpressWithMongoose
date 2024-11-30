import express from 'express';
const router = express.Router();

router.post('/create_student', userControllers.createStudent);

export const StudentRoutes = router;
