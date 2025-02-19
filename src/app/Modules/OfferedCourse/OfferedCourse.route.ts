import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from '../User/user.constant';
const router = express.Router();

router.get(
  '/',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.supper_admin,
    USER_ROLE.faculty,
  ),
  OfferedCourseControllers.getAllOfferedCourses,
);
router.get(
  '/my/offered_course',
  AuthValidationMiddleWare(USER_ROLE.student),
  OfferedCourseControllers.getMyOfferedCourses,
);
router.get(
  '/:id',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.supper_admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
  '/create_offered_course',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(
    OfferedCourseValidations.createOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  ValidateRequestMiddleWare(
    OfferedCourseValidations.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:id',
  AuthValidationMiddleWare(USER_ROLE.admin, USER_ROLE.supper_admin),
  OfferedCourseControllers.deleteOfferedCourse,
);

export const offeredCourseRoutes = router;
