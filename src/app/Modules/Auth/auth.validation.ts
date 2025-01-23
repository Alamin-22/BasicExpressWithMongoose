import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is Required' }),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password Is Required' }),
    NewPassword: z.string({ required_error: 'Password Is Required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token Is Required' }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
