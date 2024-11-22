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

const StudentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({
      message: "The Gender field can only be 'male' or 'female'",
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().max(20),
  contactNumber: z.string().min(1, 'Contact number is required'),
  emergencyContactNumber: z
    .string()
    .min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).optional(),
});

export default StudentValidationSchema;
