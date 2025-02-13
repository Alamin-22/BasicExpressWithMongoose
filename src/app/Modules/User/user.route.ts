import express from 'express';
import { userControllers } from './user.controller';
import { StudentValidations } from '../Students/student.validation';
import ValidateHRequestMiddleWare from '../../middlewares/validateRequest';
import { FacultyValidations } from '../FacultyMember/facultyMember.validation';
import { AdminValidations } from '../AdminMember/adminMember.validation';
import AuthValidationMiddleWare from '../../middlewares/authRequest';
import { USER_ROLE } from './user.constant';
import { upload } from '../../utils/sendImgToCloudinary';

const router = express.Router();

// create a middleware

router.post(
  '/create_student',
  AuthValidationMiddleWare(USER_ROLE.admin),
  upload.single('file'),
  // ValidateHRequestMiddleWare(StudentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create_faculty',
  ValidateHRequestMiddleWare(FacultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create_admin',
  ValidateHRequestMiddleWare(AdminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);

router.post(
  '/change_status/:id',
  AuthValidationMiddleWare(USER_ROLE.admin),
  ValidateHRequestMiddleWare(AdminValidations.changeStatusValidationSchema),
  userControllers.changeStatus,
);

router.get(
  '/get_me',
  AuthValidationMiddleWare(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  userControllers.getMe,
);

export const userRoutes = router;
