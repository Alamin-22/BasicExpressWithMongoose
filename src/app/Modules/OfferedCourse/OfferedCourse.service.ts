import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../SemesterRegistration/SemesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourseModel } from './OfferedCourse.model';
import { academicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { CourseModel } from '../Course/course.model';
import { FacultyModel } from '../FacultyMember/facultyMember.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  // Checking if the semester registration id is exists

  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration Not Found!',
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;
  // Checking if the Academic Faculty id is exists

  const isAcademicFacultyExists =
    await academicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty Not Found!');
  }

  // Checking if the Academic Department id is exists
  const isAcademicDepartmentExists =
    await academicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department Not Found!');
  }

  // Checking if the Academic Course id is exists
  const isCourseExists = await CourseModel.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found!');
  }

  // Checking if the Academic faculty member id is exists
  const isFacultyMemberExists = await FacultyModel.findById(faculty);

  if (!isFacultyMemberExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Faculty Member Not Found!',
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });

  return result;
};

// const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
//   const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await offeredCourseQuery.modelQuery;
//   return result;
// };

// const getSingleOfferedCourseFromDB = async (id: string) => {
//   const offeredCourse = await OfferedCourse.findById(id);

//   if (!offeredCourse) {
//     throw new AppError(404, 'Offered Course not found');
//   }

//   return offeredCourse;
// };

// const updateOfferedCourseIntoDB = async (
//   id: string,
//   payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
// ) => {
//   /**
//    * Step 1: check if the offered course exists
//    * Step 2: check if the faculty exists
//    * Step 3: check if the semester registration status is upcoming
//    * Step 4: check if the faculty is available at that time. If not then throw error
//    * Step 5: update the offered course
//    */
//   const { faculty, days, startTime, endTime } = payload;

//   const isOfferedCourseExists = await OfferedCourse.findById(id);

//   if (!isOfferedCourseExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
//   }

//   const isFacultyExists = await Faculty.findById(faculty);

//   if (!isFacultyExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
//   }

//   const semesterRegistration = isOfferedCourseExists.semesterRegistration;
//   // get the schedules of the faculties

//   // Checking the status of the semester registration
//   const semesterRegistrationStatus =
//     await SemesterRegistration.findById(semesterRegistration);

//   if (semesterRegistrationStatus?.status !== 'UPCOMING') {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
//     );
//   }

//   // check if the faculty is available at that time.
//   const assignedSchedules = await OfferedCourse.find({
//     semesterRegistration,
//     faculty,
//     days: { $in: days },
//   }).select('days startTime endTime');

//   const newSchedule = {
//     days,
//     startTime,
//     endTime,
//   };

//   if (hasTimeConflict(assignedSchedules, newSchedule)) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       `This faculty is not available at that time ! Choose other time or day`,
//     );
//   }

//   const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
//     new: true,
//   });
//   return result;
// };

// const deleteOfferedCourseFromDB = async (id: string) => {
//   /**
//    * Step 1: check if the offered course exists
//    * Step 2: check if the semester registration status is upcoming
//    * Step 3: delete the offered course
//    */
//   const isOfferedCourseExists = await OfferedCourse.findById(id);

//   if (!isOfferedCourseExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
//   }

//   const semesterRegistation = isOfferedCourseExists.semesterRegistration;

//   const semesterRegistrationStatus =
//     await SemesterRegistration.findById(semesterRegistation).select('status');

//   if (semesterRegistrationStatus?.status !== 'UPCOMING') {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
//     );
//   }

//   const result = await OfferedCourse.findByIdAndDelete(id);

//   return result;
// };

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
