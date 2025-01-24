import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isCorrectPassword = await UserModel.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isCorrectPassword)
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.jwt_access_expire_In as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string, /// this is the refresh secret
    config.jwt_refresh_expire_In as string, // this is the refresh token expire time
  );

  return {
    needsPasswordChange: user?.needsPasswordChange,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; NewPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isCorrectPassword = await UserModel.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );

  if (!isCorrectPassword)
    throw new AppError(httpStatus.FORBIDDEN, 'Old Password do not matched');

  // hashed the new password before saving to the DB

  const newHashedPassword = await bcrypt.hash(
    payload.NewPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return { passwordChangedAt: new Date() };
};

const refreshToken = async (token: string) => {
  console.log('Refresh Secret:', config.refresh_secret);
  console.log('Token:', token);

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.refresh_secret as string,
  ) as JwtPayload;

  console.log('This is coming from the refresh Token API', decoded);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.jwt_access_expire_In as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
