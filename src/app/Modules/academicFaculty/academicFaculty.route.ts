import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

// create a middleware

router.post(
  '/create_academic_faculty',
  ValidateRequestMiddleWare(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
// get all faculty
router.get('/', academicFacultyControllers.getAllAcademicFaculties);
// get single faculty
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty);

// update single faculty
router.patch(
  '/:facultyId',
  ValidateRequestMiddleWare(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
