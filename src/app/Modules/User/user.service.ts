import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudentType } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudentType) => {
  const userData: Partial<TUser> = {};
  // use Default password if pass is not provided

  userData.password = password || (config.default_password as string);

  // have to set Student Role
  userData.role = 'student';

  // find academicSemester Info
  const admissionSemesterId = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Auto generated Id
    userData.id = await generateStudentId(admissionSemesterId!);

    // create a student (transition 1)
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

export const UserServices = {
  createStudentIntoDB,
};
