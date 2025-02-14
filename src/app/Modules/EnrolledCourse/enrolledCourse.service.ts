/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourseModel } from '../OfferedCourse/OfferedCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourseModel from './enrolledCourse.model';
import { Student } from '../Students/student.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * Step1: Check if the offered course is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  const { offeredCourse } = payload;

  const isOfferedCourseExist = await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The Offered Course Couldn't found",
    );
  }

  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Maximum Number Of Students are Enrolled',
    );
  }

  const student = await Student.findOne({ _id: userId }).select('id');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student Not Found!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse,
    student: student?.id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'This student already enrolled');
  }

  return null;
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  //   const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  console.log(facultyId, payload);

  return null;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
