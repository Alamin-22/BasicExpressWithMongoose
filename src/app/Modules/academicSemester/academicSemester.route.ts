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
// get single semester
router.get(
  '/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);

// update single semester
router.patch(
  '/:semesterId',
  ValidateRequestMiddleWare(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
