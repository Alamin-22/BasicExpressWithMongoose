import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import StudentValidationSchema from './student.joy.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    // passing to the reusable func
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieve Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Something Went Wrong',
    //   error,
    // });
    // console.log(error);
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // passing to the reusable func
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieve Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // handling global error
    next(error);
  }
};

// delete single student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    // passing to the reusable func
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted Successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
