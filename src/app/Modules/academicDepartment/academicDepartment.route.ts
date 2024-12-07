import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

// create a middleware

router.post(
  '/create_academic_Department',
  ValidateRequestMiddleWare(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
// get all Department
router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
// get single Department
router.get(
  '/:DepartmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);

// update single Department
router.patch(
  '/:DepartmentId',
  ValidateRequestMiddleWare(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
