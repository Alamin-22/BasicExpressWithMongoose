import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './facultyMember.controller';
import { updateFacultyValidationSchema } from './facultyMember.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', AuthValidationMiddleWare(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
