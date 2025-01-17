import express from 'express';
import { SemesterRegistrationControllers } from './SemesterRegistration.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './SemesterRegistration.validation';

const router = express.Router();
// crate Registration
router.post(
  '/create_semester_registration',
  ValidateRequestMiddleWare(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

// get all Registered info
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);

// get Single Registered info
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
