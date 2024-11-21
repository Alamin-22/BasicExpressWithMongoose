import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating an Schema Validation using Joi

    // const student = req.body.student;
    // we can also get this using Name Alias
    const { student: studentData } = req.body; // => this is called name Alias in TS

    const { error } = StudentValidationSchema.validate(studentData);

    // will be calling services  functions to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    // console.log({ error }, { value });

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something Went Wrong',
        error: error.details, // => we have to mention this to send error details for Joi
      });
    }

    // send response

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Student retrieve Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieve Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
