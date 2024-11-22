import Joi from 'joi';

//  using joy validation schema
const UserNameValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required(),
});

const GuardianValidationSchema = Joi.object({
  fathersName: Joi.string().required(),
  fathersContactNo: Joi.string().required(),
  fathersOccupation: Joi.string().required(),
  mothersName: Joi.string().required(),
  mothersContact: Joi.string().required(),
  mothersOccupation: Joi.string().required(),
});

const LocalGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const StudentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: UserNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': "The Gender field can only be 'male' or 'female'",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} => is not a valid email',
  }),
  contactNumber: Joi.string().required(),
  emergencyContactNumber: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: GuardianValidationSchema.required(),
  localGuardian: LocalGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').optional(),
});

export default StudentValidationSchema;
// joy end
