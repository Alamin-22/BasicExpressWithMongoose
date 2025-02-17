import { Model, Types } from 'mongoose';

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
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  password: string;
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
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
}

export interface StudentModel extends Model<TStudentType> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudentType | null>;
}

