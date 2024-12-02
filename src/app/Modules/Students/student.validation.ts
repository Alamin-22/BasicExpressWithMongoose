import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

const GuardianValidationSchema = z.object({
  fathersName: z.string().min(1, "Father's name is required"),
  fathersContactNo: z.string().min(1, "Father's contact number is required"),
  fathersOccupation: z.string().min(1, "Father's occupation is required"),
  mothersName: z.string().min(1, "Mother's name is required"),
  mothersContact: z.string().min(1, "Mother's contact number is required"),
  mothersOccupation: z.string().min(1, "Mother's occupation is required"),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
    }),
  }),
});
export const StudentValidations = {
  createStudentValidationSchema,
};
