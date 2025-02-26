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

router.get(
  '/my_enrolled_courses',
  AuthValidationMiddleWare(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update_enrolled_course_marks',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.supper_admin,
    USER_ROLE.faculty,
  ),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
