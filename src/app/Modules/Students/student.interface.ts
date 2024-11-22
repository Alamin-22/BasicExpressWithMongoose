import { Model } from 'mongoose';

// Guardian Type
export type TGuardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContact: string;
};
// type of userName
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// type of Blood Group

export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
// type of Local Guardian

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// 1. Create an interface representing a document in MongoDB.
export interface TStudentType {
  id: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive?: 'active' | 'blocked';
}

// 2. Create a Schema corresponding to the document interface.

// for creating Static instance

export interface StudentModel extends Model<TStudentType> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudentType | null>;
}

// for creating Instance
// export type StudentMethods = {
//
//   isUserExists(id: string): Promise<TStudentType | null>;
// };

// export type StudentModel = Model<
//   TStudentType,
//   Record<string, never>,
//   StudentMethods
// >;
