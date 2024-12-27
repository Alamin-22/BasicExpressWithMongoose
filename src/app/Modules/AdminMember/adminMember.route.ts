import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './adminMember.controller';
import { updateAdminValidationSchema } from './adminMember.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
