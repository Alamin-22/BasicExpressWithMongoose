import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department Must be a String',
      required_error: 'name is Required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Must be a String',
      required_error: 'academicFaculty required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department Must be a String',
      required_error: 'name is Required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Must be a String',
      required_error: 'academicFaculty required',
    }),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
