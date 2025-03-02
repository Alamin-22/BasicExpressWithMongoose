import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistrationModel } from '../SemesterRegistration/SemesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourseModel } from './OfferedCourse.model';
import { academicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { academicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { CourseModel } from '../Course/course.model';
import { FacultyModel } from '../FacultyMember/facultyMember.model';
import { hasTimeConflict } from './OfferedCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { Student } from '../Students/student.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;
  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
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

  // checking if the department belong to Faculty

  const isDepartmentBelongToTheFaculty = await academicDepartmentModel.findOne({
    academicFaculty,
    _id: academicDepartment,
  });

  if (!isDepartmentBelongToTheFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExists.name} is not belong the this ${isAcademicFacultyExists.name} Faculty!!`,
    );
  }

  // checking if same offered course and same registration course are exist

  const isSameOfferedCourseExistWithSameRegisteredWithSameSectionExist =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistWithSameRegisteredWithSameSectionExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course with same Section is already Exist`,
    );
  }

  // get the schedules for the Faculty Members

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The faculty member is not available at that time!! Chose other time or day`,
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });

  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();
  return { meta, result };
};

const getMyOfferedCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  //pagination setup

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const studentInfo = await Student.findOne({ id: userId });
  // find the student
  if (!studentInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not  found');
  }

  //find current ongoing semester
  const currentOngoingRegistrationSemesterInfo =
    await SemesterRegistrationModel.findOne({
      status: 'ONGOING',
    });

  if (!currentOngoingRegistrationSemesterInfo) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no ongoing semester registration!',
    );
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemesterInfo?._id,
        academicDepartment: studentInfo?.academicDepartment,
        academicFaculty: studentInfo?.academicFaculty,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemesterInfo?._id,
          currentStudent: studentInfo?._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$currentOngoingRegistrationSemester',
                    ],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: studentInfo?._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completedCoursesIds: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPrerequisiteFulfilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCoursesIds',
              ],
            },
          ],
        },

        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPrerequisiteFulfilled: false,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourseModel.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourseModel.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourseModel.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  const isFacultyExists = await FacultyModel.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration).select(
      'status',
    );

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  getMyOfferedCoursesFromDB,
};
