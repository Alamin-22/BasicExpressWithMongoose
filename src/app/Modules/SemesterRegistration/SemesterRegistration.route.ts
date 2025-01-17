import express from 'express';
import { SemesterRegistrationControllers } from './SemesterRegistration.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './SemesterRegistration.validation';

const router = express.Router();

router.post(
  '/create_semester_registration',
  ValidateRequestMiddleWare(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
