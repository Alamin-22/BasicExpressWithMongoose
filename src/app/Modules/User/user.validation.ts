import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password Must be a String',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(), // password is a required string
});

export default userValidationSchema;
