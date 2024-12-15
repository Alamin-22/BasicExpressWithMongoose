import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import httpStatus from 'http-status';
import { TStudentType } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';

  // Create a copy of the query object to exclude unnecessary fields
  const queryObj = { ...query };

  // Extract searchTerm if present
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
    delete queryObj.searchTerm; // Remove searchTerm from queryObj
  }

  // Build the search query
  const searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // Exclude fields not relevant for filtering
  const excludeFields = ['sort', 'limit'];
  excludeFields.forEach((field) => delete queryObj[field]);

  // Apply additional filtering and population
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // Determine sort order
  let sort = '-createdAt'; // Default sort by creation date descending
  if (query.sort) {
    sort = query.sort as string; // Use sort from query if available
  }

  // Apply sorting and execute the query
  const sortedResults = filterQuery.sort(sort);

  let limit = 2;
  if (query.limit) {
    limit = query.limit as number;
  }

  const limitQuery = await sortedResults.limit(limit);

  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id }); // we can achieve it by using mongoDb aggregate

  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

// update students form DB
const updateStudentIntoDB = async (
  id: string,
  payload: Partial<TStudentType>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete students form Db
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Student');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Student');
    }

    await session.commitTransaction();
    await session.endSession();
    // return the value
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    console.log(error);
    throw new Error('Failed To create Student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  updateStudentIntoDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
