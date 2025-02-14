import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create_enrolled_course',
  AuthValidationMiddleWare(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

// router.patch(
//   '/update-enrolled-course-marks',
//   auth('faculty'),
//   validateRequest(
//     EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
//   ),
//   EnrolledCourseControllers.updateEnrolledCourseMarks,
// );

export const EnrolledCourseRoutes = router;
