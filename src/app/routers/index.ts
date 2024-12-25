import { Router } from 'express';
import { userRoutes } from '../Modules/User/user.route';
import { StudentRoutes } from '../Modules/Students/student.route';
import { academicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../Modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../Modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../Modules/FacultyMember/facultyMember.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic_semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic_faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic_departments',
    route: academicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
