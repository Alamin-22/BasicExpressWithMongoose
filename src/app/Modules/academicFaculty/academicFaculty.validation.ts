import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty Must be a String',
  }),
});

export default academicFacultyValidationSchema;
