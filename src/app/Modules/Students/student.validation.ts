import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

const createGuardianValidationSchema = z.object({
  fathersName: z.string().min(1, "Father's name is required"),
  fathersContactNo: z.string().min(1, "Father's contact number is required"),
  fathersOccupation: z.string().min(1, "Father's occupation is required"),
  mothersName: z.string().min(1, "Mother's name is required"),
  mothersContact: z.string().min(1, "Mother's contact number is required"),
  mothersOccupation: z.string().min(1, "Mother's occupation is required"),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNumber: z.string(),
      emergencyContactNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = createUserNameValidationSchema.partial();

const updateGuardianValidationSchema = createGuardianValidationSchema.partial();

const updateLocalGuardianValidationSchema =
  createLocalGuardianValidationSchema.partial();

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema,
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNumber: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianValidationSchema,
        localGuardian: updateLocalGuardianValidationSchema,
        admissionSemester: z.string().optional(),
        profileImg: z.string().optional(),
      })
      .partial(),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
