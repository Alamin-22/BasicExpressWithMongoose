import { TLoginUser } from './Auth.interface';

const loginUser = async (payload: TLoginUser) => {
  console.log('This is coming from the Service', payload);
  return {};
};

export const AuthServices = {
  loginUser,
};
