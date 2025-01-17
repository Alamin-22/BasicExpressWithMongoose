import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistrationModel } from './SemesterRegistration.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './SemesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // check if there any registered semester that is ongoing or upcoming

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: RegistrationStatus.UPCOMING }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester`,
    );
  }

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

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the  requested Semester exist
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  semester not found!');
  }

  // if the requested Semester Registration then we will not alow to update it

  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `THis semester is ALready ${currentSemesterStatus}`,
    );
  }

  //   UPCOMING -----> ONGOING ----->ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not Directly change status ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  //   UPCOMING -----> ONGOING ----->ENDED
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not Directly change status ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const singleSemesterRegistered =
    await SemesterRegistrationModel.findById(id).populate('academicSemester');

  return singleSemesterRegistered;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
};
