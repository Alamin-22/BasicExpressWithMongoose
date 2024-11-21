import { Schema, model, connect } from 'mongoose';

// Guardian Type
export type Guardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContact: string;
};
// type of userName
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// type of Blood Group

export type BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
// type of Local Guardian

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// 1. Create an interface representing a document in MongoDB.
export interface StudentType {
  id: string;
  name: UserName;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: BloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'Active' | 'InActive';
}

// 2. Create a Schema corresponding to the document interface.
