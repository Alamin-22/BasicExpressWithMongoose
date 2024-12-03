import { Router } from 'express';
import { userRoutes } from '../Modules/User/user.route';
import { StudentRoutes } from '../Modules/Students/student.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;