import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // using Zod

    // const zodParserData = userValidationSchema.parse(studentData);

    // will be calling services  functions to send this data
    // const result = await StudentServices.createStudentIntoDB(studentData); // => passing validate value into the func
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    ); // => passing validate value into the func

    // send response

    // res.status(200).json({
    //   success: true,
    //   message: 'Student Created Successfully',
    //   data: result,
    // });

    // passing the response to the Reusable func
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
