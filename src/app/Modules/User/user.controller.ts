import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // using Zod

  // const zodParserData = userValidationSchema.parse(studentData);

  // will be calling services  functions to send this data
  // const result = await StudentServices.createStudentIntoDB(studentData); // => passing validate value into the func
  const result = await UserServices.createStudentIntoDB(password, studentData); // => passing validate value into the func

  // passing the response to the Reusable func
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
