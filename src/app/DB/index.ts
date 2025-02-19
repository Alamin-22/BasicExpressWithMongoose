import config from '../config';
import { USER_ROLE } from '../Modules/User/user.constant';
import { UserModel } from '../Modules/User/user.model';

const SupperUser = {
  id: '0001',
  email: 'mollik@admin.com',
  password: config.supper_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.supper_admin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSupperAdmin = async () => {
  const isSupperAdminExists = await UserModel.findOne({
    role: USER_ROLE.supper_admin,
  });

  if (!isSupperAdminExists) {
    await UserModel.create(SupperUser);
  }
};

export default seedSupperAdmin;
