import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty Must be a String',
  }),
});
const updateAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty Must be a String',
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
