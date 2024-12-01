/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// we are moving out our try catch logic to this func=> this is called higher order func
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();

  // passing to the reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieve Successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // passing to the reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieve Successfully',
    data: result,
  });
});

// delete single student
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;

  const result = await StudentServices.deleteStudentFromDB(studentId);

  // passing to the reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted Successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
