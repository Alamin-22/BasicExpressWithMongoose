/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudentType } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../FacultyMember/facultyMember.interface';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { FacultyModel } from '../FacultyMember/facultyMember.model';
import { AdminModel } from '../AdminMember/adminMember.model';
import { sendImageToCloudinary } from '../../utils/sendImgToCloudinary';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudentType,
) => {
  const userData: Partial<TUser> = {};
  // use Default password if pass is not provided

  userData.password = password || (config.default_password as string);

  // have to set Student Role
  userData.role = 'student';
  userData.email = payload?.email;

  // find academic Department Info
  const academicDepartmentInfo = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartmentInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not Found!!');
  }

  payload.academicFaculty = academicDepartmentInfo.academicFaculty;

  // find academicSemester Info
  const admissionSemesterInfo = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemesterInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not Found!!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Auto generated Id
    userData.id = await generateStudentId(admissionSemesterInfo!);

    // sending image to cloudinary

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const uploadedImage = await sendImageToCloudinary(imageName, path);

      payload.profileImg = uploadedImage.secure_url;
    }

    // create a user (transition 1)
    const newUser = await UserModel.create([userData], { session }); /// => using transaction

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transition 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);
  console.log({ userData });

  //set student role
  userData.role = 'faculty';
  userData.email = payload?.email;

  // find academic department info
  const academicDepartmentInfo = await academicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartmentInfo) {
    throw new AppError(400, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartmentInfo?.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const uploadedImage = await sendImageToCloudinary(imageName, path);

      payload.profileImg = uploadedImage.secure_url;
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const uploadedImage = await sendImageToCloudinary(imageName, path);

      payload.profileImg = uploadedImage.secure_url;
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;

  switch (role) {
    case 'student':
      result = await Student.findOne({ id: userId })
        .populate('admissionSemester')
        .populate({
          path: 'academicDepartment',
          populate: {
            path: 'academicFaculty',
          },
        });
      break;
    case 'admin':
      result = await AdminModel.findOne({ id: userId });
      break;
    case 'faculty':
      result = await FacultyModel.findOne({ id: userId });
      break;
    default:
      result = null; // Handle unknown roles if necessary
      break;
  }

  return result;
};

const changeUserStatus = async (
  userId: string,
  payload: { status: string },
) => {
  const result = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeUserStatus,
  getMe,
};
