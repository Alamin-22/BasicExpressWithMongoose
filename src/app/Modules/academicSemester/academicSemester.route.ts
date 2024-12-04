import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';
const router = express.Router();

// create a middleware

router.post(
  '/create_academic_semester',
  ValidateRequestMiddleWare(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);
// get all semester
router.get('/', academicSemesterControllers.getAllAcademicSemester);

export const academicSemesterRoutes = router;
