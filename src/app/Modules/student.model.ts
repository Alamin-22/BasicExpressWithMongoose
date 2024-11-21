import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './Students/student.interface';

// 2. Create a Schema corresponding to the document interface.

const UserNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const GuardianSchema = new Schema<Guardian>({
  fathersName: {
    type: String,
    required: true,
  },
  fathersContactNo: {
    type: String,
    required: true,
  },
  fathersOccupation: {
    type: String,
    required: true,
  },
  mothersName: {
    type: String,
    required: true,
  },
  mothersContact: {
    type: String,
    required: true,
  },
  mothersOccupation: {
    type: String,
    required: true,
  },
});
const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: UserNameSchema,
  //   this is called Enum type in Mongoose => this is only used for predefined property that will never gonna change
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },

  // again we are using Enum Because Blood Group is already for all time Predefined
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: { type: String },
  // enum
  isActive: ['active', 'blocked'],
});

// 3. Create a Model.
// const User = model<IUser>('User', userSchema);

const Student = model<Student>('Student', StudentSchema);
