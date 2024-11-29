import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(), // id is a required string
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 characters' }), // password is a required string
  needsPasswordChange: z.boolean().optional().default(true), // needsPasswordChange is a boolean
  role: z.enum(['admin', 'student', 'faculty']), // role must be one of these values
  status: z.enum(['in-progress', 'blocked']).default('in-progress'), // status must be either 'in-progress' or 'blocked'
  isDeleted: z.boolean().optional().default(false), // isDeleted is a boolean
});

export const UserValidation = {
  userValidationSchema,
};
