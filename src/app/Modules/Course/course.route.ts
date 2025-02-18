import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create_course',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/:id',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  CourseControllers.deleteCourse,
);

router.put(
  '/:courseId/assign_faculties',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.get(
  '/:courseId/get_faculties',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.supper_admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove_faculties',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get(
  '/',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getAllCourses,
);

export const CourseRoutes = router;
