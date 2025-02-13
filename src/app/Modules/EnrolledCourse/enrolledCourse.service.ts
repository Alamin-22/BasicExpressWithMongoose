/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEnrolledCourse } from './enrolledCourse.interface';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * Step1: Check if the offered cousres is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  const { offeredCourse } = payload;
  console.log(offeredCourse);

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
