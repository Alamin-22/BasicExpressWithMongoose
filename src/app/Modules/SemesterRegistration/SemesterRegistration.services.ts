import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistrationModel } from './SemesterRegistration.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // CHECK If the semester already registered
  const academicSemester = payload.academicSemester;

  const isSemesterRegistrationAlreadyExist =
    await SemesterRegistrationModel.findOne({ academicSemester });

  if (isSemesterRegistrationAlreadyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This academic semester already Registered',
    );
  }

  // check if the Semester exist
  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found!',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
};
